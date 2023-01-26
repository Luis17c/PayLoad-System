import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { IUsersRepository } from "../../users/interfaces/IUsersRepository";
import { ITransactionsRepository } from "../interfaces/ITransactionsRepository";

@injectable()
export class RevertTransactionService{
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("TransactionsRepository")
        private transactionsRepository: ITransactionsRepository
    ){}

    public async use(transactionId:string){
        const transaction = await this.transactionsRepository.findTransactionById(transactionId)
        const payer = transaction.payerId
        const receiver = transaction.receiverId

        if(transaction.revertedAt){
            throw new AppError("This transaction is already reverted")
        }

        payer.balance -= -transaction.value
        receiver.balance -= transaction.value

        transaction.revertedAt = new Date()
        
        await this.transactionsRepository.save(transaction)
        await this.usersRepository.save(payer)
        await this.usersRepository.save(receiver)

        return transaction
    }
}