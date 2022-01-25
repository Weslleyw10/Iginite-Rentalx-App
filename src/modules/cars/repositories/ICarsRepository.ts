import { ICreateCarDto } from "@modules/cars/dtos/ICreateCarDto";
import { Car } from "../infra/typeorm/entities/Car";


export interface ICarsRepository {
    create(data: ICreateCarDto): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car>
    findById(car_id: string): Promise<Car>
    findAvailable(
        category_id?: string,
        brand?: string,
        name?: string,
    ): Promise<Car[]>
}