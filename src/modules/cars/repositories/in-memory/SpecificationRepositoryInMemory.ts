import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";


export class SpecificationRepositoryInMemory implements ISpecificationsRepository {
    specifications: Specification[] = []

    async findByName(name: any): Promise<Specification> {
        return this.specifications.find(spec => spec.name === name)
    }
    async list(): Promise<Specification[]> {
        return this.specifications
    }
    async create({ name, description }: ISpecificationDTO): Promise<Specification> {
        const specification = new Specification()

        Object.assign(specification, {
            description,
            name
        })

        this.specifications.push(specification)

        return specification
    }
    async findByIds(ids: string[]): Promise<Specification[]> {
        return this.specifications.filter(specification => ids.includes(specification.id))
    }

}