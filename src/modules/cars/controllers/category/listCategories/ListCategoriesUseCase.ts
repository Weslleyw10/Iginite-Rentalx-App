import { inject, injectable } from 'tsyringe'

import { ICategoriesRepository } from '../../../repositories/ICategoriesRepository'
import { Category } from '../../../entities/Category'

@injectable()
export class ListCategoriesUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ){}

    async execute(): Promise<Category[]> {        
        return await this.categoriesRepository.list()    
    }

}