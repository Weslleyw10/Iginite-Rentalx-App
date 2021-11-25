import { Specification } from "../../entities/Specification";
import { ISpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

export class SpecificationsRepository implements ISpecificationsRepository {
    private specifications: Specification[];

    private static INSTANCE: SpecificationsRepository

    private constructor() {
        this.specifications = [];
    }

    public static getSpecification(): SpecificationsRepository {
        if(!SpecificationsRepository.INSTANCE) {
            SpecificationsRepository.INSTANCE = new SpecificationsRepository();
        }

        return SpecificationsRepository.INSTANCE
    }

    findByName(name: string): Specification {
        const specification = this.specifications.find(spec => spec.name === name);
        return specification
    }
    list(): Specification[] {
        return this.specifications        
    }
    create({ name, description }: ISpecificationDTO): void {
        const specification = new Specification()

        Object.assign(specification, {
            name,
            description,
            created_at: new Date(),
        })

        this.specifications.push(specification);

    }

}