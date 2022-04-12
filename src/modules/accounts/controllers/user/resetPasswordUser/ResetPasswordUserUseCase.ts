import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs"

import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { ErrorHandle } from "@shared/errors/ErrorHandle";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";

interface IRequest {
    token: string;
    password: string;
}

@injectable()
export class ResetPasswordUserUseCase {

    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,

        @inject("UserRepository")
        private userRepository: IUserRepository

    ) {}

    async execute({token, password}: IRequest): Promise<void> {
        const userToken = await this.usersTokensRepository.findByRefreshToken(token)

        if(!userToken) {
            throw new ErrorHandle("Invalid token.")
        }

        const compareDates = this.dateProvider.compareIfBefore(
            userToken.expires_date, 
            this.dateProvider.now()
        )

        if(compareDates) {
            throw new ErrorHandle("Token expired.")
        }

        const user = await this.userRepository.findById(userToken.user_id)

        user.password = await hash(password, 8)

        await this.userRepository.create(user)

        await this.usersTokensRepository.deleteById(userToken.id)



    }
}