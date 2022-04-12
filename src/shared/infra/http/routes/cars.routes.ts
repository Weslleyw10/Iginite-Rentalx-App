import { Router } from "express"
import multer from "multer"
import upload from "@config/upload"

import { CreateCarController } from "@modules/cars/controllers/car/createCar/createCarController"
import { ListCarsAvailableController } from "@modules/cars/controllers/car/listAvailableCars/listAvailableCarsController"
import { CreateCarSpecificationController } from "@modules/cars/controllers/car/createCarSpecification/CreateCarSpecificationController"

import { EnsureAdmin } from "../middlewares/ensureAdmin"
import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated"
import { UploadCarImageController } from "@modules/cars/controllers/car/uploadCarImage/UploadCarImageController"

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listCarsAvailable = new ListCarsAvailableController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImageController = new UploadCarImageController()

const uploadImages = multer(upload)

carsRoutes.post('/', EnsureAuthenticated, EnsureAdmin, createCarController.handle)
carsRoutes.get('/available', listCarsAvailable.handle)
carsRoutes.post('/specifications/:car_id', EnsureAuthenticated, EnsureAdmin, createCarSpecificationController.handle)
carsRoutes.post(
    '/images/:id', 
    EnsureAuthenticated, 
    EnsureAdmin,
    uploadImages.array("images"),
    uploadCarImageController.handle
)

export { carsRoutes }