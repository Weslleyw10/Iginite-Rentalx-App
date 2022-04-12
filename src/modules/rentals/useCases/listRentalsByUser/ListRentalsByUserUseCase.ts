import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/infra/typeorm/repositories/IRentalsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    user_id: string;
}

@injectable()
export class ListRentalsByUserUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository
    ){}

    async execute({ user_id }: IRequest): Promise<Rental[]>{
        return await this.rentalsRepository.findByUser(user_id)
    }
}