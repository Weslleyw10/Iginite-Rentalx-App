import { ISpecificationsRepository } from '../../../repositories/ISpecificationsRepository'
import { Specification } from '../../../entities/Specification'

export class ListSpecificationsUseCase {
    constructor(private specificationsRepository: ISpecificationsRepository){}

    execute(): Specification[] {
        return this.specificationsRepository.list()
    }
    
}