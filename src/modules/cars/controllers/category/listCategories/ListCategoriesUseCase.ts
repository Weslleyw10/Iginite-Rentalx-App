import { ICategoriesRepository } from '../../../repositories/ICategoriesRepository'
import { Category } from '../../../entities/Category'

export class ListCategoriesUseCase {
    constructor(private categoriesRepository: ICategoriesRepository){}

    execute(): Category[] {
        return this.categoriesRepository.list()    
    }

}