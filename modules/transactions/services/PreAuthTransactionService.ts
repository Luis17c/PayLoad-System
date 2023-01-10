import { injectable } from "tsyringe";
import { ITransactionDTO } from "../dtos/ITransactionDTO";
import AppError from "../../../shared/errors/AppError";
import { UsersRepository } from "../../users/infra/typeorm/UsersRepository";

@injectable()
export class PreAuthTransactionService{
    constructor(
        private usersRepository: UsersRepository,
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