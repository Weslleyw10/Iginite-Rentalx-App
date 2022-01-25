import { inject, injectable } from 'tsyringe'
import { hash } from 'bcryptjs'

import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { IUserDTO } from '@modules/accounts/dtos/IUserDTO'
import { ErrorHandle } from '@shared/errors/ErrorHandle';

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ){}

    async execute({ name, email, password, driver_license }: IUserDTO): Promise<void> {
        const usernameAlreadyExists = await this.userRepository.findByEmail(email);

        if (usernameAlreadyExists) {
            throw new ErrorHandle("Username already exists.")
        }

        const passwordHashed = await hash(password, 8)

        await this.userRepository.create({
            name,
            email,
            password: passwordHashed,
            driver_license
        })
    }
}