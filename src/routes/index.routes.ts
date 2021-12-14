import { Router } from "express"

import { categoriesRoutes } from './categories.routes'
import { specificationsRoutes } from './specifications.routes';
import { accountsRoutes } from './accounts.routes'
import { authenticateRoutes } from './authenticate.routes'

const router = Router();

router.use("/categories", categoriesRoutes)
router.use("/specifications", specificationsRoutes)
router.use("/accounts", accountsRoutes)
router.use(authenticateRoutes)

export { router }