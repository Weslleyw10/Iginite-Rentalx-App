import { inject, injectable } from "tsyringe";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/infra/typeorm/repositories/IRentalsRepository";
import { ErrorHandle } from "@shared/errors/ErrorHandle";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

dayjs.extend(utc)


@injectable()
export class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,

        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}

    async execute({
        user_id, 
        car_id, 
        expected_return_date
    }: IRequest): Promise<Rental> {

        const minimumHourRental = 24

        const carUnavailable = await this.rentalsRepository.findByCar(car_id)

        if(carUnavailable) {
            throw new ErrorHandle("Car is unavailable.")
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)

        if(rentalOpenToUser) {
            throw new ErrorHandle("There's a rental in progress for user.")
        }

        const compareDates = this.dateProvider.compareInHours(
            this.dateProvider.now(),
            expected_return_date
        )

        if(compareDates < minimumHourRental) {
            throw new ErrorHandle("Invalid return time.")
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date
        })

        await this.carsRepository.updateStatus(car_id, false)

        return rental

    }
}