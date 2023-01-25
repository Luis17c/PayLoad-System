import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError"
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
            throw new AppError("E-Mail is already in use")
        }
        const cpfOrCnpjExists = await this.userRepository.findUserByCpfOrCnpj(cpfOrCnpj)
        if(cpfOrCnpjExists){
            throw new AppError("CPF or CNPJ is already in use")
        }
    }
}