import { verify } from "jsonwebtoken"

import { NextFunction, Request, Response } from "express";

import { jwtConfig } from "@config/jwtConfig";
import AppError from "@shared/errors/AppError";
import { ITokenData } from "./interfaces/ITokenData";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../users/interfaces/IUsersRepository";

@injectable()
export default class EnsureAuthMiddle{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ){}

    public async use(req:Request, res:Response, next:NextFunction){
        const authHeader = req.headers.authorization

        if (!authHeader){
            throw new AppError("Authorization token is missing", 401)
        }

        const [, token] = authHeader.split(" ")

            const { sub } = verify(token, jwtConfig.key) as ITokenData
            console.log(sub)

            const user = await this.usersRepository.findUserById(sub)

            if (!user){
               throw new AppError("User doesn't exist")
            }

            next()
    }
}