import { injectable } from "tsyringe";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import AppError from "../errors/AppError";
import { UsersRepository } from "../infra/typeorm/UsersRepository";

@injectable()
export class CheckUniqueDataService{
    constructor(
        private userRepository: UsersRepository
    ){}

    public async use(data: ICreateUserDTO){
        const emailExists = await this.userRepository.findUserByEmail(data.email)
        if(emailExists){
            throw new AppError("This e-mail is already in use")
        }

        const cpfOrCnpjExists = await this.userRepository.findUserByCpfOrCnpj(data.cpfOrCpnj)
        if(cpfOrCnpjExists){
            throw new AppError("This Cpf or Cnpj is already in use")
        }
    }
}