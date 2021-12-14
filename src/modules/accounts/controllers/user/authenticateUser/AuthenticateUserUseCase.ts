import { inject, injectable } from "tsyringe";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { IUserRepository } from "../../../repositories/IUserRepository";
import { ErrorHandle } from "../../../../../errors/ErrorHandle";

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
}

@injectable()
export class AuthenticateUserUseCase {
    constructor(
        @inject('UserRepository')
        private usersRepository: IUserRepository
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        // verify if user exists
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new ErrorHandle("Email or password incorrect.")
        }

        // compare password
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new ErrorHandle("Email or password incorrect.")
        }

        // generate JWT
        const token = sign({}, "16be10699a99b19be5bf5f028f183831", {
            subject: user.id,
            expiresIn: "1d"
        })

        return {
            token,
            user: {
                name: user.name,
                email: user.email,
            }
        }


    }
}