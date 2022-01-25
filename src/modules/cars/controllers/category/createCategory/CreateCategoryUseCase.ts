import { inject, injectable } from 'tsyringe'

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository"
import { ErrorHandle } from '@shared/errors/ErrorHandle'

interface IRequest {
    name: string;
    description: string;
}

@injectable()
export class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlreadyExists = await this.categoriesRepository.findByName(name)

        if (categoryAlreadyExists) {
            throw new ErrorHandle("Category already exists.")
        }

        this.categoriesRepository.create({ name, description })

    }


}