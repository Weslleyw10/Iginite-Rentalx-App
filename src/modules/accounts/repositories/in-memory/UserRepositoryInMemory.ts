import { IUserDTO } from "../../dtos/IUserDTO";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

export class UserRepositoryInMemory implements IUserRepository {
    users: User[] = []

    async findByName(name: string): Promise<User> {
        return this.users.find(u => u.name === name);
    }
    async findByEmail(email: string): Promise<User> {
        return this.users.find(u => u.email === email)
    }
    async findById(id: string): Promise<User> {
        return this.users.find(u => u.id === id)
    }
    async list(): Promise<User[]> {
        return this.users
    }
    async create({ name, password, email, driver_license, avatar, id }: IUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, {
            name,
            password,
            email,
            driver_license
        })

        this.users.push(user);

    }

}