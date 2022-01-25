import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

export class CategoriesRepositoryInMemory implements ICategoriesRepository {

    categories: Category[] = []

    async findByName(name: string): Promise<Category> {
        const category = this.categories.find(c => c.name === name);
        return category
    }
    async list(): Promise<Category[]> {
        const categories = this.categories
        return categories
    }
    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = new Category()
        Object.assign(category, {
            name,
            description
        })

        this.categories.push(category)

    }

}