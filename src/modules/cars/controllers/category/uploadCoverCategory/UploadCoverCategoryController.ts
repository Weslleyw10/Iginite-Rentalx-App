import { Request, Response } from 'express';
import { UploadCoverCategoryUseCase } from './UploadCoverCategoryUseCase'

export class UploadCoverCategoryController {
    constructor(private uploadCoverCategoryUseCase: UploadCoverCategoryUseCase){}

    handle(request:Request, response:Response): Response {
        const { file } = request
        console.log(file)

        return response.send()
    }

}