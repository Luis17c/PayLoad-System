import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { isFunctionDeclaration } from "typescript";
import { iCreateUserDTO } from "../dtos/iCreateUserDTO";
import { usersRepository } from "../infra/typeorm/usersRepository";
import { checkBirthService } from "./checkBirthService";

@injectable()
export class createUserService {
    constructor(
        private usersRepository: usersRepository,        
        ){}

    public async use(data: iCreateUserDTO){
        const emailExists = this.usersRepository.findUserByEmail(data.email)

        if (!emailExists) {
            throw new Error ("E-mail already in use")            
        }

        const hashedPassword = await hash(data.password, 10)
        data.password = hashedPassword

        const parsedBirth = new Date(data.birth)
        data.birth = parsedBirth

        const checkBirth = new checkBirthService()

        const birthIsValid = checkBirth.use(data.birth)

        if (!birthIsValid){
            throw new Error("User don't have 18 years old")
        }
        
        const createdUser = await this.usersRepository.createUser(data)

        return createdUser
    }
}