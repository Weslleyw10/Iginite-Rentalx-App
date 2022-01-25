import { Request, Response } from "express"
import { container } from "tsyringe"
import { UploadCarImageUseCase } from "./UploadCarImageUseCase"

interface IFile {
    filename: string
}

export class UploadCarImageController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const images = request.files as IFile[]

        const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase)

        const fileNames = images.map(file => file.filename)

        const images_name = uploadCarImageUseCase.execute({ 
            car_id:id, 
            images_name: fileNames 
        })

        return response.json(images_name)

    }
}