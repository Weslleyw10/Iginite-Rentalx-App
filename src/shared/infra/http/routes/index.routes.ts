import { Router } from "express"

import { categoriesRoutes } from './categories.routes'
import { specificationsRoutes } from './specifications.routes';
import { accountsRoutes } from './accounts.routes'
import { authenticateRoutes } from './authenticate.routes'
import { carsRoutes } from './cars.routes'
import { rentalsRoutes } from "./rentals.routes";
import { passwordRoutes } from "./password.routes";

const router = Router();

router.use("/categories", categoriesRoutes)
router.use("/specifications", specificationsRoutes)
router.use("/accounts", accountsRoutes)
router.use("/cars", carsRoutes)
router.use("/rentals", rentalsRoutes)
router.use("/password", passwordRoutes)
router.use(authenticateRoutes)

export { router }