import { inject, injectable } from 'tsyringe'
import { v4 as uuidV4 } from "uuid"

import { resolve } from "path"

import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { ErrorHandle } from '@shared/errors/ErrorHandle';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';

@injectable()
export class ForgetPasswordMailUseCase {
    constructor(
        @inject('UserRepository')
        private usersRepository: IUserRepository,

        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository,

        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider,

        @inject("EtherealMailProvider")
        private mailProvider: IMailProvider

    ){}

    async execute(email: string) {
        const user = await this.usersRepository.findByEmail(email)

        const templatePath = resolve(
            __dirname, "..", "..", "..", "views", "emails", "forgetPassword.hbs"
        )

        if(!user) {
            throw new ErrorHandle("User does not exists.")
        }

        const token = uuidV4()
        const expires_date = this.dateProvider.addHours(3)

        await this.usersTokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date
        })

        const variablesTemplateEmail = {
            name: user.name,
            link: `${process.env.FORGET_MAIL_URL}${token}`
        }

        await this.mailProvider.sendMail(
            email,
            "Recuperação de senha",
            `O link para resetar sua senha é ${token}`,
            variablesTemplateEmail,
            templatePath
        )
  

    }


}