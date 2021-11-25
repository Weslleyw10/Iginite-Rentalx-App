import { UploadCoverCategoryController } from './UploadCoverCategoryController'
import { UploadCoverCategoryUseCase } from './UploadCoverCategoryUseCase'


const uploadCoverCategoryUseCase = new UploadCoverCategoryUseCase()
const uploadCoverUploadController = new UploadCoverCategoryController(uploadCoverCategoryUseCase)

export { uploadCoverUploadController }