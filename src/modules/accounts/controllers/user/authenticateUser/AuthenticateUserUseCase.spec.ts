import { ErrorHandle } from "@shared/errors/ErrorHandle"
import { IUserDTO } from "@modules/accounts/dtos/IUserDTO"
import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory"

import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UserRepositoryInMemory
let createUserUseCase: CreateUserUseCase
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: DayjsDateProvider


describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UserRepositoryInMemory()
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
        dateProvider = new DayjsDateProvider()

        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider
        )

    })

    it("Should be able to authenticate an user.", async () => {
        const user: IUserDTO = {
            name: "User Test",
            password: "1234",
            email: "user@example.com",
            driver_license: "000123"
        }

        await createUserUseCase.execute(user)
        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        })

        expect(result).toHaveProperty("token")

    })

    it("Should not be able to authenticate an no exist user.", async () => {
        await expect(
            authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "1234"
            })            
        ).rejects.toEqual(new ErrorHandle("Email or password incorrect."))
    })    

    it("Should not be able to authenticate with incorrect password.", async () => {
        const user: IUserDTO = {
            name: "User Test Error",
            password: "1234",
            email: "user@example.com",
            driver_license: "000123"
        }

        await createUserUseCase.execute(user)

        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: "falsePassword"
            })
        ).rejects.toEqual(new ErrorHandle("Email or password incorrect."))        
    })

    it("Should not be able to authenticate with incorrect email.", async () => {
        const user: IUserDTO = {
            name: "User Test Error",
            password: "1234",
            email: "user@example.com",
            driver_license: "000123"
        }

        await createUserUseCase.execute(user)

        await expect(
            authenticateUserUseCase.execute({
                email: "false@email.com",
                password: user.password
            })
        ).rejects.toEqual(new ErrorHandle("Email or password incorrect."))    
    })



})