import { injectable } from "tsyringe";
import { ITransactionDTO } from "../dtos/ITransactionDTO";
import { UsersRepository } from "../infra/typeorm/UsersRepository";

@injectable()
export class PreAuthTransactionService{
    constructor(
        private usersRepository: UsersRepository,
    ){}

    public async use(data: ITransactionDTO){
        const payer = await this.usersRepository.findUserByEmail(data.payerEmail)
        const receiver = await this.usersRepository.findUserByEmail(data.receiverEmail)

        if (payer.shopkeeper){
            throw new Error("Shopkeepers cannot make transactions")
        }

        if (payer.balance < data.value){
            throw new Error("Balance isn't enought")
        }

        if(!receiver){
            throw new Error("User not found")
        }

        return true
    }
}