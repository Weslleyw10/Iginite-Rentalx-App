import { verify, sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import authInfos from "@config/auth"
import { ErrorHandle } from '@shared/errors/ErrorHandle'

import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider"

interface IPayload {
    sub: string,
    email: string
}

interface ITokenResponse {
    token: string,
    refresh_token: string
}

@injectable()
export class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute(token: string): Promise<ITokenResponse> {
        const { sub, email } = verify(token, authInfos.secret_refresh_token) as IPayload
        const user_id = sub

        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
            user_id,
            token
        )

        if (!userToken) {
            throw new ErrorHandle("Refresh token does not exists.")
        }

        await this.usersTokensRepository.deleteById(userToken.id)

        const refresh_token = sign({ email }, authInfos.secret_refresh_token, {
            subject: sub,
            expiresIn: authInfos.expires_in_refresh_token
        })

        const expires_date = this.dateProvider.addDays(
            authInfos.expires_refresh_token_days
        ) 

        await this.usersTokensRepository.create({
            expires_date,
            refresh_token,
            user_id
        })

        const newToken = sign({}, authInfos.secret_refresh_token, {
            subject: user_id,
            expiresIn: authInfos.expires_in_token
        })


        return {
            refresh_token,
            token: newToken
        }

    }

}