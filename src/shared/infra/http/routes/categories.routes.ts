import { Router } from 'express'
import multer from 'multer'

import { CreateCategoryController } from '@modules/cars/controllers/category/createCategory/CreateCategoryController'
import { ImportCategoryController } from '@modules/cars/controllers/category/importCategory/ImportCategoryController'
import { ListCategoriesController } from '@modules/cars/controllers/category/listCategories/ListCategoriesController'

const categoriesRoutes = Router()

const upload = multer({ dest: './tmp'})

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()

categoriesRoutes.post('/', createCategoryController.handle)

categoriesRoutes.get('/', listCategoriesController.handle)

categoriesRoutes.post('/import', upload.single('file'), importCategoryController.handle)

// categoriesRoutes.post('/upload', upload.single('file'), (request, response) => {
//     return uploadCoverUploadController.handle(request, response)    
// })


export { categoriesRoutes }
