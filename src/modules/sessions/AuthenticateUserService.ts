import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { inject, injectable } from "tsyringe";
import { jwtConfig } from "@config/jwtConfig";
import AppError from "@shared/errors/AppError";
import { IUsersRepository } from "../users/interfaces/IUsersRepository";

@injectable()
export class AuthenticateUserService{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ){}

    public async use(email:string, password:string){
        const user = await this.usersRepository.findUserByEmail(email)

        if(!user){
            throw new AppError("Incorrect E-Mail or password")
        }

        const passwordMatched = await compare(password, user.password)

        if(!passwordMatched){
            throw new AppError("Incorrect E-Mail or password")
        }

        const token = sign({}, jwtConfig.key, {
            subject: user.id,
            expiresIn: jwtConfig.expiration
        })
        
        return {
            user: {
                name: user.name,
                email: user.email,
            }, 
            token
        }
    }
}