import { Router } from 'express'
import { AuthenticateUserController } from '@modules/accounts/controllers/user/authenticateUser/AuthenticateUserController'
import { RefreshTokenController } from '@modules/accounts/controllers/user/refreshToken/RefreshTokenController'

const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()

const authenticateRoutes = Router()

authenticateRoutes.post("/sessions", authenticateUserController.handle)

authenticateRoutes.post('/refresh-token', refreshTokenController.handle)

export { authenticateRoutes }
