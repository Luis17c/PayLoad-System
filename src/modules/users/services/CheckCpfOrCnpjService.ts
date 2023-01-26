import { cpf, cnpj } from 'cpf-cnpj-validator'
import AppError from "@shared/errors/AppError"

export class CheckAndFormatCpfOrCnpjService{
    constructor(){}

    public async use(cpfOrCnpj:string){
        if (cpf.isValid(cpfOrCnpj)){
            const userCpf = cpf.format(cpfOrCnpj)
            return userCpf
        }

        if (cnpj.isValid(cpfOrCnpj)){
            const userCnpj = cnpj.format(cpfOrCnpj)
            return userCnpj
        }

        throw new AppError("Invalid cpf or cnpj")
    }
}