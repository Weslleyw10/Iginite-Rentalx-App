import { Specification } from "../entities/Specification";

interface ISpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    findByName(name): Promise<Specification>
    
    list(): Promise<Specification[]>

    create({ name, description }: ISpecificationDTO): Promise<void>
}

export { ISpecificationsRepository, ISpecificationDTO }