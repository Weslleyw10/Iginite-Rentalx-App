import { ICreateCarDto } from "@modules/cars/dtos/ICreateCarDto";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { getRepository, Repository } from "typeorm"


import { Car } from "../entities/Car";


export class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>

    constructor() {
        this.repository = getRepository(Car);
    }

    async findById(car_id: string): Promise<Car> {
        return await this.repository.findOne(car_id);
    }
    
    async create({
        id,
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
        specifications
    }: ICreateCarDto): Promise<Car> {

        const car = this.repository.create({
            id,
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            specifications
        })

        return await this.repository.save(car)
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {        
        return await this.repository.findOne({ license_plate })
    }

    async findAvailable(category_id?: string, brand?: string, name?: string): Promise<Car[]> {        
        const carsQuery = await this.repository
            .createQueryBuilder("c")
            .where("available = :available", { available: true })

        if (category_id) {
            carsQuery.andWhere("c.category_id = :category_id", { category_id })            
        }

        if (brand) {
            carsQuery.andWhere("c.brand = :brand", { brand })
        }

        if (name) {
            carsQuery.andWhere("c.name = :name", { name })
        }

        return await carsQuery.getMany()


    }

    

}