import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "../entities/Rental";


export interface IRentalsRepository {
    findByCar(car_id: string): Promise<Rental>
    findOpenRentalByUser(user_id): Promise<Rental>
    create({
        user_id,
        car_id,
        expected_return_date
    }: ICreateRentalDTO): Promise<Rental>

    
    
    
}