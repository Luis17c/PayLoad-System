import { appendFile } from "fs";
import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import { Users } from "../infra/typeorm/Users";
import { IUsersRepository } from "../interfaces/IUsersRepository";

@injectable()
export class ListDeleteUsers{
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    public async list(){
        const users:Users[] = await this.usersRepository.listAllUsers()
        return users
    }

    public async find(id:string){
        const user = await this.usersRepository.findUserById(id)
        return user
    }

    public async delete(id:string){
        const user = await this.usersRepository.findUserById(id)
        if (!user){
            throw new AppError("User doesn't exists")
        }
        await this.usersRepository.deleteUser(id)
    }
}