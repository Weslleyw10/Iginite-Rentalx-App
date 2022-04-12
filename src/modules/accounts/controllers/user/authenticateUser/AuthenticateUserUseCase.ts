import { inject, injectable } from "tsyringe";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { ErrorHandle } from "@shared/errors/ErrorHandle";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import authInfos from "@config/auth"
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    },
    token: string;
    refresh_token: string;
}

@injectable()
export class AuthenticateUserUseCase {
    constructor(
        @inject('UserRepository')
        private usersRepository: IUserRepository,

        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider

    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        // verify if user exists
        const user = await this.usersRepository.findByEmail(email);

        const { 
            expires_in_token, 
            secret_refresh_token, 
            secret_token, 
            expires_in_refresh_token,
            expires_refresh_token_days
        } = authInfos

        if (!user) {
            throw new ErrorHandle("Email or password incorrect.")
        }

        // compare password
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new ErrorHandle("Email or password incorrect.")
        }

        // generate JWT
        const token = sign({}, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token
        })

        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: user.id,
            expiresIn: expires_in_refresh_token
        })

        const refresh_token_expires_date = this.dateProvider.addDays(
            expires_refresh_token_days
        )

        await this.usersTokensRepository.create({
            user_id: user.id,
            refresh_token,
            expires_date: refresh_token_expires_date
        })

        return {
            token,
            refresh_token,
            user: {
                name: user.name,
                email: user.email,
            }
        }


    }
}