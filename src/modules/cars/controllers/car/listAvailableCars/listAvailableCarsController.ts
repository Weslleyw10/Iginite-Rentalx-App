import { Request, Response } from "express"
import { container } from "tsyringe"
import { ListAvailableCarsUseCase } from "./listAvailableCarsUseCase"

export class ListCarsAvailableController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { category_id, name, brand } = request.query
        const listAvailableCarsUseCase = await container.resolve(ListAvailableCarsUseCase)

        const cars = await listAvailableCarsUseCase.execute({
            category_id: category_id as string,
            brand: brand as string,
            name: name as string,
        })

        return response.json(cars)

    }

}