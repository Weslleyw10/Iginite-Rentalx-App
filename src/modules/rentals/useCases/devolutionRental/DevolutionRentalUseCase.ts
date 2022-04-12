import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/infra/typeorm/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { ErrorHandle } from "@shared/errors/ErrorHandle";
import { inject, injectable } from "tsyringe";

interface IRequest {
    rental_id: string;
}

@injectable()
export class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,

        @inject("CarsRepository")
        private carsRepository: ICarsRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider

    ) {}

    async execute({ rental_id }: IRequest): Promise<Rental> {
        const rental = await this.rentalsRepository.findById(rental_id)
        const car = await this.carsRepository.findById(rental.car_id)
        
        const minimum_daily = 1

        if(!rental) {
            throw new ErrorHandle("Rental not found.")
        }

        const dateNow = this.dateProvider.now()

        let daily = this.dateProvider.compareInDays(
            rental.start_date,
            this.dateProvider.now()
        ) as number

        if(daily <= 0) {
            daily = minimum_daily
        }

        let total = 0

        const delay = this.dateProvider.compareInDays(
            dateNow,
            rental.expected_return_date
        ) as number

        if (delay > 0) {
            const calculate_fine = delay * car.fine_amount
            total = calculate_fine
        }

        total += daily * car.daily_rate

        rental.end_date = this.dateProvider.now()
        rental.total = total

        await this.rentalsRepository.create(rental)
        await this.carsRepository.updateStatus(rental.car_id, true)

        return rental

    }


}