import { Request, Response } from "express";

import { container, inject, injectable } from "tsyringe";

import AppError from "../../shared/errors/AppError";

import { IBcryptProvider } from "../../shared/infra/bcrypt/IBcryptProvider";
import { IUsersRepository } from "../users/interfaces/IUsersRepository";

import { CheckBirthService } from "../users/services/CheckBirthService";
import { CheckAndFormatCpfOrCnpjService } from "../users/services/CheckCpfOrCnpjService";
import { CheckEmailService } from "../users/services/CheckEmailService";
import { CheckUniqueDataService } from "../users/services/CheckUniqueDataService";

@injectable()
export class UserController{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject("BcryptProvider")
        private bcryptProvider: IBcryptProvider
    ){}

    public async create(req:Request, res:Response){
        var userData = req.body

        const checkEmail = new CheckEmailService()
        checkEmail.use(userData.email)

        const checkAndFormatCpfOrCnpj = new CheckAndFormatCpfOrCnpjService()
        const checkedCpfOrCnpj = await checkAndFormatCpfOrCnpj.use(userData.cpfOrCnpj)
        userData.cpfOrCnpj = checkedCpfOrCnpj

        const checkUniqueData = container.resolve(CheckUniqueDataService)
        await checkUniqueData.use(userData.email, userData.cpfOrCnpj)

        const emailExists = this.usersRepository.findUserByEmail(userData.email)

        if (!emailExists) {
            throw new AppError ("E-mail already in use")            
        }

        const hashedPassword = await this.bcryptProvider.hash(userData.password)
        userData.password = hashedPassword

        const parsedBirth = new Date(userData.birth)
        userData.birth = parsedBirth

        const checkBirth = new CheckBirthService()
        const birthIsValid = checkBirth.use(userData.birth)
        if (!birthIsValid){
            throw new AppError("User don't have 18 years old")
        }
        
        const createdUser = await this.usersRepository.createUser(userData)
        res.send(createdUser)
    }

    public async list(req:Request, res:Response){
        const users = await this.usersRepository.listAllUsers()
        res.send(users)
    }

    public async remove(req:Request, res:Response){
        const id = req.body.id
        const user = await this.usersRepository.findUserById(id)
        if (!user){
            throw new AppError("User doesn't exists")
        }
        await this.usersRepository.deleteUser(id)
        const userNotRemove = await this.usersRepository.findUserById(id)
        if (userNotRemove){
            throw new AppError("User doesn't removed")
        }
        res.send("User removed")
    }
}