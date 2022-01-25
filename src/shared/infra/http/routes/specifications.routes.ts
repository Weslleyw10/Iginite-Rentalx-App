import { Router } from "express"

import { CreateSpecificationController } from '@modules/cars/controllers/specification/createSpecification/CreateSpecificationController'
import { ListSpecificationsController } from '@modules/cars/controllers/specification/listSpecifications/ListSpecificationsController'
import { EnsureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated"


const specificationsRoutes = Router()

const createSpecificationController = new CreateSpecificationController()
const listSpecificationsController = new ListSpecificationsController()


specificationsRoutes.use(EnsureAuthenticated)
specificationsRoutes.get('/', listSpecificationsController.handle)
specificationsRoutes.post('/', createSpecificationController.handle)

export { specificationsRoutes }
