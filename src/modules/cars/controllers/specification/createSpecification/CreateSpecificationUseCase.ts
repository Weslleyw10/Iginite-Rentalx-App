import { inject, injectable } from 'tsyringe'
import { ErrorHandle } from '../../../../../errors/ErrorHandle'

import { ISpecificationsRepository } from '../../../repositories/ISpecificationsRepository'

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