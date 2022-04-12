import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ForgetPasswordMailUseCase } from './ForgetPasswordMailUseCase'

export class ForgetPasswordMailController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.body

        const forgetPasswordMailUseCase = container.resolve(
            ForgetPasswordMailUseCase
        )

        await forgetPasswordMailUseCase.execute(email)

        return response.send()

    }

}