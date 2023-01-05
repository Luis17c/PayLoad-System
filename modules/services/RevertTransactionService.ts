import { injectable } from "tsyringe";
import { TransactionsRepository } from "../infra/typeorm/TransactionsRepository";
import { UsersRepository } from "../infra/typeorm/UsersRepository";

@injectable()
export class RevertTransactionService{
    constructor(
        private userRepository: UsersRepository,
        private transactionRepository: TransactionsRepository
    ){}

    public async use(transactionId:string){
        const transaction = await this.transactionRepository.findTransactionById(transactionId)
        const payer = transaction.payerId
        const receiver = transaction.receiverId

        if(transaction.revertedAt){
            throw new Error("This transaction is already reverted")
        }

        payer.balance -= -transaction.value
        receiver.balance -= transaction.value

        transaction.revertedAt = new Date()
        
        await this.transactionRepository.save(transaction)
        await this.userRepository.save(payer)
        await this.userRepository.save(receiver)

        return transaction
    }
}