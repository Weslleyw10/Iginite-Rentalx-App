import { User } from "../entities/User";
import { IUserDTO } from "../dtos/IUserDTO";

interface IUserRepository {
    findByName(name: string): Promise<User>
    
    findByEmail(email: string): Promise<User>

    findById (id: string): Promise<User>

    list(): Promise<User[]>

    create({
        name,
        password,
        email,
        driver_license,
        avatar,
        id   
    }: IUserDTO): Promise<void>
}

export { IUserRepository, IUserDTO }