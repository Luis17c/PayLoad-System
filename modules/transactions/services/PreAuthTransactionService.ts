import { inject, injectable } from "tsyringe";

import { ITransactionDTO } from "../dtos/ITransactionDTO";
import AppError from "../../../shared/errors/AppError";
import { IUsersRepository } from "../../users/interfaces/IUsersRepository";

@injectable()
export class PreAuthTransactionService{
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
    ){}

    public async use(data: ITransactionDTO){
        const payer = await this.usersRepository.findUserByEmail(data.payerEmail)
        const receiver = await this.usersRepository.findUserByEmail(data.receiverEmail)

        if (payer.shopkeeper){
            throw new AppError("Shopkeepers cannot make transactions")
        }

        if (payer.balance < data.value){
            throw new AppError("Balance isn't enought")
        }

        if(!receiver){
            throw new AppError("User not found")
        }

        return true
    }
}