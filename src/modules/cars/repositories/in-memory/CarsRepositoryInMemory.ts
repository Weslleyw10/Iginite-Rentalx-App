import { ICreateCarDto } from "@modules/cars/dtos/ICreateCarDto";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";


export class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = []

    async create({
        id,
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id
    }: ICreateCarDto): Promise<Car> {

        const car = new Car()

        Object.assign(car, {
            id,
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id
        })

        this.cars.push(car)

        return car

    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find(car => car.license_plate === license_plate)
    }

    async findAvailable(
        category_id?: string,
        brand?: string,
        name?: string,
    ): Promise<Car[]> {
        
        return this.cars.filter(car => {
            if(car.available === true || 
                (category_id && car.category_id === category_id) ||
                (brand && car.brand === brand) ||
                (name && car.name === name)
            ) {
                return car
            }

            return null

        })        
    }

    async findById(car_id: string): Promise<Car> {
        return this.cars.find(car => car.id === car_id)
    }

    async updateStatus(id: string, available: boolean): Promise<void> {
        const findIndexCar = this.cars.findIndex(car => car.id === id)
        this.cars[findIndexCar].available = available
    }


}