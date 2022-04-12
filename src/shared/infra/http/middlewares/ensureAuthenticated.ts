import { NextFunction, Request, Response} from "express"
import { verify } from "jsonwebtoken"

import authInfos from "@config/auth"
import { ErrorHandle } from "@shared/errors/ErrorHandle"
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository"

interface IPayload {
    sub: string
}

export async function EnsureAuthenticated(
    request: Request, 
    response: Response, 
    next: NextFunction): 
    Promise<void> {

    const authHeader = request.headers.authorization

    if (!authHeader) {
        throw new ErrorHandle("Token missing.", 401)
    }

    const [, token] = authHeader.split(" ")

    try {
        const { sub: user_id } = verify (
            token, 
            authInfos.secret_token
        ) as IPayload

        request.user = {
            id: user_id
        }

        next()

    } catch (error) {
        throw new Error("Invalid token.")
    }

    
}
