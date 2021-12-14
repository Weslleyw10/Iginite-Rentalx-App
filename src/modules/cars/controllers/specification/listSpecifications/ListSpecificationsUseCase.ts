import { inject, injectable } from 'tsyringe'

import { ISpecificationsRepository } from '../../../repositories/ISpecificationsRepository'
import { Specification } from '../../../entities/Specification'

@injectable()
export class ListSpecificationsUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository
    ){}

    async execute(): Promise<Specification[]> {
        return await this.specificationsRepository.list()
    }
    
}