import { inject, injectable } from "tsyringe";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImageRepository";

interface IRequest {
    car_id: string;
    images_name: string[]
}

@injectable()
export class UploadCarImageUseCase {
    constructor(
        @inject("CarsImageRepository")
        private carsImagesRepository: ICarsImagesRepository
    ){}

    async execute({ car_id, images_name }): Promise<void> {
        images_name.map(async image => {
            await this.carsImagesRepository.create(car_id, image)
        })
        
    }


}