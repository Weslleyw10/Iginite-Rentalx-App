import { ICreateUserTokenDto } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UsersTokens } from "@modules/accounts/infra/typeorm/entities/UsersTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";


export class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
    userTokens: UsersTokens[] = []

    async create({ expires_date, refresh_token, user_id, }: ICreateUserTokenDto): Promise<UsersTokens> {    
        const userTokens = new UsersTokens()

        Object.assign(userTokens, {
            expires_date,
            refresh_token,
            user_id
        })

        this.userTokens.push(userTokens)

        return userTokens
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersTokens> {
        return this.userTokens.find(
            userToken => userToken.user_id === user_id
            && userToken.refresh_token === refresh_token
        )        
    }

    async deleteById(id: string): Promise<void> {
        const userToken = this.userTokens.find(
            userToken => userToken.id === id
        )

        this.userTokens.splice(
            this.userTokens.indexOf(userToken)
        )

    }

    async findByRefreshToken(refresh_token: string): Promise<UsersTokens> {
       return this.userTokens.find(
           userToken => userToken.refresh_token === refresh_token
        )
    }

}