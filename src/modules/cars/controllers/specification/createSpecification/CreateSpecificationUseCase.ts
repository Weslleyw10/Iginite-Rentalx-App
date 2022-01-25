import { inject, injectable } from 'tsyringe'

import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'
import { ErrorHandle } from '@shared/errors/ErrorHandle'

interface IRequest {
    name: string;
    description: string;
}

@injectable()
export class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRespository: ISpecificationsRepository
    ){}

    async execute({ name, description }: IRequest): Promise<void> {
        const specification = await this.specificationsRespository.findByName(name)
        
        if(specification) {
            throw new ErrorHandle("Specification already exists.")
        }

        await this.specificationsRespository.create({
            name, 
            description
        })

    }
}