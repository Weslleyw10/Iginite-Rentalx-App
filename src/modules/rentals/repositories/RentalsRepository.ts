import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../infra/typeorm/repositories/IRentalsRepository";

export class RentalsRepository implements IRentalsRepository {

    private repository: Repository<Rental>

    constructor() {
        this.repository = getRepository(Rental)
    }    

    async findByCar(car_id: string): Promise<Rental> {
        return await this.repository.findOne({ 
            where: { car_id, end_date: null }
        })
    }

    async findOpenRentalByUser(user_id: any): Promise<Rental> {
        return await this.repository.findOne({ 
            where: { user_id, end_date: null }
        })

    }
    
    async create({ 
        user_id, 
        car_id, 
        expected_return_date,
        id,
        end_date,
        total

    }: ICreateRentalDTO): Promise<Rental> {        
        const rental = this.repository.create({
            user_id,
            car_id,
            expected_return_date,
            id,
            end_date,
            total
        })

        await this.repository.save(rental)

        return rental

    }

    async findById(id: string): Promise<Rental> {
        return await this.repository.findOne(id)
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        return await this.repository.find({
            where: { user_id },
            relations: ["car"]
        })
    }

    

}