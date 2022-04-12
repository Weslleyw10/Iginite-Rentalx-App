import { getRepository, Repository } from 'typeorm'

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IUserDTO } from "@modules/accounts/dtos/IUserDTO";

export class UserRepository implements IUserRepository {
    private repository: Repository<User>

    constructor() {
        this.repository = getRepository(User)
    }

    async findByName(name: string): Promise<User> {
        const user = await this.repository.findOne({ name })
        return user
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email })
        return user
    }

    async findById (id: string): Promise<User> {
        return await this.repository.findOne(id)         
    }

    async list(): Promise<User[]> {
        const users = await this.repository.find()
        return users
    }

    async create({ name, password, email, driver_license, id, avatar }: IUserDTO): Promise<void> {
        const user = await this.repository.create({
            name,
            password,
            email,
            driver_license,
            id,
            avatar
        })

        await this.repository.save(user)

    }
}