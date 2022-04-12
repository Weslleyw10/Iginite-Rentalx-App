import { ForgetPasswordMailController } from "@modules/accounts/controllers/user/forgetPasswordMail/ForgetPasswordMailController"
import { ResetPasswordUserController } from "@modules/accounts/controllers/user/resetPasswordUser/ResetPasswordUserController"
import { Router } from "express"

const passwordRoutes = Router()

const forgetPasswordMailController = new ForgetPasswordMailController()
const resetPasswordUserController = new ResetPasswordUserController()

passwordRoutes.post("/forget", forgetPasswordMailController.handle)
passwordRoutes.post("/reset", resetPasswordUserController.handle)

export { passwordRoutes }