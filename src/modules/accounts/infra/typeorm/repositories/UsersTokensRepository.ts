import { ICreateUserTokenDto } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { Repository, getRepository } from "typeorm";
import { UsersTokens } from "../entities/UsersTokens";


export class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UsersTokens>

    constructor() {
        this.repository = getRepository(UsersTokens)
    }   

    async create({ expires_date, refresh_token, user_id, }: ICreateUserTokenDto): Promise<UsersTokens> {
        const userToken = this.repository.create({
            expires_date,
            refresh_token,
            user_id
        })

        return await this.repository.save(userToken)
        
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersTokens> {
        return await this.repository.findOne({ 
            user_id,
            refresh_token
         })
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id)
    }

    async findByRefreshToken(refresh_token: string): Promise<UsersTokens> {        
        return await this.repository.findOne({ refresh_token })
    }


}