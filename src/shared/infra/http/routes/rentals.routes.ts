import { Router } from "express"

import { EnsureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated"
import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController"

const rentalsRoutes = Router()

const createRentalController = new CreateRentalController()

rentalsRoutes.post("/", EnsureAuthenticated, createRentalController.handle)


export { rentalsRoutes }