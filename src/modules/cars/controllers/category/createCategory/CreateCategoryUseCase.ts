import { inject, injectable } from 'tsyringe'
import { ErrorHandle } from '../../../../../errors/ErrorHandle'

import { ICategoriesRepository } from "../../../repositories/ICategoriesRepository"

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