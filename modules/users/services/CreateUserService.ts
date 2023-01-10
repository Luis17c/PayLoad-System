import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import AppError from "../../../shared/errors/AppError";
import { CheckBirthService } from "./CheckBirthService";
import { IUsersRepository } from "../interfaces/IUsersRepository";

@injectable()
export class createUserService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,        
    ){}

    public async use(data: ICreateUserDTO){
        const emailExists = this.usersRepository.findUserByEmail(data.email)

        if (!emailExists) {
            throw new AppError ("E-mail already in use")            
        }

        const hashedPassword = await hash(data.password, 10)
        data.password = hashedPassword

        const parsedBirth = new Date(data.birth)
        data.birth = parsedBirth

        const checkBirth = new CheckBirthService()

        const birthIsValid = checkBirth.use(data.birth)

        if (!birthIsValid){
            throw new AppError("User don't have 18 years old")
        }
        
        const createdUser = await this.usersRepository.createUser(data)

        return createdUser
    }
}