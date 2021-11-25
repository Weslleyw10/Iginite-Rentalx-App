import { Router } from 'express'
import multer from 'multer'

import createCategoryController from '../modules/cars/controllers/category/createCategory'
import { listCategoriesController } from '../modules/cars/controllers/category/listCategories'
import { uploadCoverUploadController } from '../modules/cars/controllers/category/uploadCoverCategory'
import { importCategoryController } from '../modules/cars/controllers/category/importCategory'

const categoriesRoutes = Router()

const upload = multer({ dest: './tmp'})

categoriesRoutes.post('/', (request, response) => {    
    console.log("testess")
    return createCategoryController().handle(request, response)
})

categoriesRoutes.get('/', (request, response) => {
    return listCategoriesController.handle(request, response)
})

categoriesRoutes.post('/upload', upload.single('file'), (request, response) => {
    return uploadCoverUploadController.handle(request, response)    
})

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
    return importCategoryController.handle(request, response)    
})


export { categoriesRoutes }
