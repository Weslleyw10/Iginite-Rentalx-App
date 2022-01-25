import { NextFunction, Request, Response} from "express"
import { verify } from "jsonwebtoken"

import { ErrorHandle } from "@shared/errors/ErrorHandle"
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository"

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
            "16be10699a99b19be5bf5f028f183831"
        ) as IPayload

        const userRepository = new UserRepository()
        const user = await userRepository.findById(user_id)

        if(!user) {
            throw new ErrorHandle("User does not exist.", 401)
        }

        request.user = {
            id: user_id
        }

        next()

    } catch (error) {
        throw new Error("Invalid token.")
    }

    
}
