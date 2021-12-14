import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {

        try {
            const { name, email, password, driver_license } = request.body

            const createUser = container.resolve(CreateUserUseCase)

            await createUser.execute({
                name,
                email,
                password,
                driver_license
            })

            return response.status(201).send()
            
        } catch (err) {
            return response.status(400).json({ message: err.message })
        }



    }
}