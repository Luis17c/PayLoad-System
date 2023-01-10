import { verify } from "jsonwebtoken"
import { NextFunction, Request, Response } from "express";

import { jwtConfig } from "../../config/jwtConfig";
import AppError from "../../shared/errors/AppError";
import { ITokenData } from "./ITokenData";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../users/interfaces/IUsersRepository";
import { UsersRepository } from "../users/infra/typeorm/UsersRepository";


export default class EnsureAuthMiddle{
    constructor(){}

    public async use(req:Request, res:Response, next:NextFunction){
        const usersRepository = new UsersRepository()
        const authHeader = req.headers.authorization

        if (!authHeader){
            throw new AppError("Authorization token is missing", 401)
        }

        const [, token] = authHeader.split(" ")

        try{
            const { sub } = verify(token, jwtConfig.key) as ITokenData

            const user = await usersRepository.findUserById(sub)

            if (!user){
               throw new AppError("User doesn't exist")
            }

            next()
        }catch(err){
            console.log(err)
        }
    }
}