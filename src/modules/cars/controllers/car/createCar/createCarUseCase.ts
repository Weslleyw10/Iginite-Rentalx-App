import { injectable, inject } from "tsyringe";

import { ICreateCarDto } from "@modules/cars/dtos/ICreateCarDto";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { ErrorHandle } from "@shared/errors/ErrorHandle";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

@injectable()
export class CreateCarUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) { }

    async execute({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id
    }: ICreateCarDto): Promise<Car> {

        const carAlreadyExists = await this.carsRepository.findByLicensePlate(license_plate)

        if(carAlreadyExists) {
            throw new ErrorHandle("Car already exists.")
        }

        const car = await this.carsRepository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id
        })

        return car

    }
}