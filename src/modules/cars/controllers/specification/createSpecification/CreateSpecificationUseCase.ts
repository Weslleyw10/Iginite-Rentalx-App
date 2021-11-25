import { ISpecificationsRepository } from '../../../repositories/ISpecificationsRepository'

interface IRequest {
    name: string;
    description: string;
}

export class CreateSpecificationUseCase {
    constructor(private specificationsRespository: ISpecificationsRepository){}

    execute({ name, description }: IRequest) {

        const specification = this.specificationsRespository.findByName(name)
        
        if(specification) {
            throw new Error("Specification already exists.")
        }

        this.specificationsRespository.create({
            name, 
            description
        })

    }
}