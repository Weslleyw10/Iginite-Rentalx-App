import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'
import { EnsureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

import { CreateUserController } from '@modules/accounts/controllers/user/createUser/CreateUserController'
import { UpdateUserAvatarController } from '@modules/accounts/controllers/user/updateUserAvatar/updateUserAvatarController'

const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()


const accountsRoutes = Router()

const uploadAvatar = multer(uploadConfig)

accountsRoutes.post('/user', createUserController.handle)

accountsRoutes.patch(
    '/avatar',
    EnsureAuthenticated,
    uploadAvatar.single("avatar"), 
    updateUserAvatarController.handle
)

export { accountsRoutes }