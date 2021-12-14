import { Request, Response } from "express"
import { container } from "tsyringe"

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

export class AuthenticateUserController {

    async handle(req: Request, res: Response): Promise<Response> {

        try {
            const { email, password } = req.body

            const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)

            const authenticateInfo = await authenticateUserUseCase.execute({ email, password })

            return res.json(authenticateInfo)

        } catch (error) {

            return res.status(400).json({ message: error.message })

        }


    }
}