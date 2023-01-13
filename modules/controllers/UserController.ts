import { Request, Response } from "express";
import { container, inject, injectable } from "tsyringe";
import AppError from "../../shared/errors/AppError";
import { Users } from "../users/infra/typeorm/Users";
import { IUsersRepository } from "../users/interfaces/IUsersRepository";
import { CheckAndFormatCpfOrCnpjService } from "../users/services/CheckCpfOrCnpjService";
import { CheckEmailService } from "../users/services/CheckEmailService";
import { CheckUniqueDataService } from "../users/services/CheckUniqueDataService";
import { createUserService } from "../users/services/CreateUserService";

@injectable()
export class UserController{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
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

        const createUser = container.resolve(createUserService)
        const createdUser = await createUser.use(userData)

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