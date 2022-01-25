import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { ErrorHandle } from "@shared/errors/ErrorHandle";
import { Request, Response, NextFunction } from "express";


export async function EnsureAdmin(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { id } = request.user

    const usersRepository = new UserRepository()
    const user = await usersRepository.findById(id)

    if(!user.isAdmin) {
        throw new ErrorHandle("User isn't admin.")
    }

    return next()

}