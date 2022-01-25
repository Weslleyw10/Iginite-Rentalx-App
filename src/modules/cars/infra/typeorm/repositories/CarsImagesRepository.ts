import { getRepository, Repository } from "typeorm";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImageRepository";
import { CarsImage } from "../entities/CarImage";



export class CarsImageRepository implements ICarsImagesRepository {
    private repository: Repository<CarsImage>;

    constructor() {
        this.repository = getRepository(CarsImage)    
    }


    async create(car_id: string, image_name: string): Promise<CarsImage> {
        const carImage = this.repository.create({
            car_id,
            image_name
        })

        await this.repository.save(carImage)

        return carImage

    }

}