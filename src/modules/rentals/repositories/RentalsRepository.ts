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
        return await this.repository.findOne({ car_id })
    }
    async findOpenRentalByUser(user_id: any): Promise<Rental> {
        return await this.repository.findOne({ user_id })

    }
    async create({ 
        user_id, 
        car_id, 
        expected_return_date 

    }: ICreateRentalDTO): Promise<Rental> {        
        const rental = this.repository.create({
            user_id,
            car_id,
            expected_return_date
        })

        await this.repository.save(rental)

        return rental

    }

    

}