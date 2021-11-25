import { Specification } from "../entities/Specification";

interface ISpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    findByName(name): Specification;
    list(): Specification[];
    create({ name, description}: ISpecificationDTO): void

}

export { ISpecificationsRepository, ISpecificationDTO }