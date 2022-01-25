import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

interface ISpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    findByName(name): Promise<Specification>
    
    list(): Promise<Specification[]>

    create({ name, description }: ISpecificationDTO): Promise<Specification>

    findByIds(ids: string[]): Promise<Specification[]>
}

export { ISpecificationsRepository, ISpecificationDTO }