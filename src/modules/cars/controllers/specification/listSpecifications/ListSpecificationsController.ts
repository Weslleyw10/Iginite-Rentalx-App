import { Request, Response } from "express";
import { container } from 'tsyringe'

import { ListSpecificationsUseCase } from './ListSpecificationsUseCase'

export class ListSpecificationsController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const listSpecificationsUseCase = container.resolve(ListSpecificationsUseCase)

            const specifications = await listSpecificationsUseCase.execute()
            return response.json(specifications)

        } catch (error) {
            return response.status(400).json({ message: error.message })
        }
    }

}