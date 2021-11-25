import { CreateCategoryUseCase } from "./CreateCategoryUseCase"
import { CreateCategoryController } from "./CreateCategoryController"
import { CategoriesRepository } from '../../../repositories/implementations/CategoriesRepository'

console.log("Create Category")


export default(): CreateCategoryController => {
    const categoriesRespository = new CategoriesRepository()
    const createCategoryUseCase = new CreateCategoryUseCase(categoriesRespository)
    const createCategoryController = new CreateCategoryController(createCategoryUseCase)

    return createCategoryController
}
