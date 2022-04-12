import { Router } from "express"

import { EnsureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated"
import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController"
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController"
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController"

const rentalsRoutes = Router()

const createRentalController = new CreateRentalController()
const devolutionRentalUseCase = new DevolutionRentalController()
const listRentalsByUserController = new ListRentalsByUserController()

rentalsRoutes.post("/", EnsureAuthenticated, createRentalController.handle)
rentalsRoutes.post("/devolution/:id", EnsureAuthenticated, devolutionRentalUseCase.handle)
rentalsRoutes.get("/user", EnsureAuthenticated, listRentalsByUserController.handle)


export { rentalsRoutes }