import { Request, Response} from "express";
import { container } from "tsyringe";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

export class CreateCarSpecificationController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { car_id } = request.params
        const { specifications_ids } = request.body

        const createCarSpecificationUseCase = container.resolve(
            CreateCarSpecificationUseCase
        )

        const car = await createCarSpecificationUseCase.execute({
            car_id,
            specifications_ids
        })

        return response.json(car)


    }
}