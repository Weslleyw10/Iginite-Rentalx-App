import { Repository, getRepository } from 'typeorm'
import { Specification } from "../../entities/Specification";
import { ISpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

export class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>

    constructor() {
        this.repository = getRepository(Specification)
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({ name })
        return specification
        
    }

    async list(): Promise<Specification[]> {
        const specifications = await this.repository.find()
        return specifications
    }
    
    async create({ name, description }: ISpecificationDTO): Promise<void> {
        const specification = this.repository.create({ name, description})
        await this.repository.save(specification)
    }

}