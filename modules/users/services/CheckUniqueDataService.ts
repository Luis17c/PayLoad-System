import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import { IUsersRepository } from "../interfaces/IUsersRepository";

@injectable()
export class CheckUniqueDataService{
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ){}

    public async use(email:string, cpfOrCnpj:string){
        const emailExists = await this.userRepository.findUserByEmail(email)
        if(emailExists){
            return false
        }
        const cpfOrCnpjExists = await this.userRepository.findUserByCpfOrCnpj(cpfOrCnpj)
        if(cpfOrCnpjExists){
            return false
        }
        return true
    }
}