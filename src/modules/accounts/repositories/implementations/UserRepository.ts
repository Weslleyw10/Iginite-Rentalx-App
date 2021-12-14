import { getRepository, Repository } from 'typeorm'

import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";
import { IUserDTO } from "../../dtos/IUserDTO";

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
        const user = await this.repository.findOne(id)
        return user
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