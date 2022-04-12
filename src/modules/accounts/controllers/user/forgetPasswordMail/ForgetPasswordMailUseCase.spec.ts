import { jest } from "@jest/globals"


import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { ErrorHandle } from "@shared/errors/ErrorHandle";
import { ForgetPasswordMailUseCase } from "./ForgetPasswordMailUseCase";


let forgetPasswordMailUseCase: ForgetPasswordMailUseCase
let userRepositoryInMemory: UserRepositoryInMemory
let dateProvider: DayjsDateProvider
let usersTokensRepository: UsersTokensRepositoryInMemory
let mailProvider: MailProviderInMemory

describe("Send Forget Mail", () => {

    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory()
        dateProvider = new DayjsDateProvider()
        usersTokensRepository = new UsersTokensRepositoryInMemory()
        mailProvider = new MailProviderInMemory()

        forgetPasswordMailUseCase = new ForgetPasswordMailUseCase(
            userRepositoryInMemory,
            usersTokensRepository,
            dateProvider,
            mailProvider
        )
    })

    it("Should be able to send a forget password mail to user.", async () => {
        const sendMail = jest.spyOn(mailProvider, "sendMail")

        await userRepositoryInMemory.create({
            driver_license: "123246",
            email: "user@example.com",
            name: "user@example",
            password: "1235"
        })

        await forgetPasswordMailUseCase.execute("user@example.com")

        expect(sendMail).toHaveBeenCalled()

    })

    it("Should not be able to send an mail if user does not exists.", async () => {
        await expect(
            forgetPasswordMailUseCase.execute("user@example.com.br")
        ).rejects.toEqual(new ErrorHandle("User does not exists."))
    })

    it("Should be able to create an users token", async () => {
        const generateTokenMail = jest.spyOn(usersTokensRepository, "create")

        await userRepositoryInMemory.create({
            driver_license: "123246B",
            email: "user2@example.com",
            name: "user@example",
            password: "1235"
        })

        await forgetPasswordMailUseCase.execute("user2@example.com")

        expect(generateTokenMail).toHaveBeenCalled()

    })



})