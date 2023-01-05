import { injectable } from "tsyringe";
import { ICreateTransactionDTO } from "../dtos/ICreateTransactionDTO";
import { ITransactionDTO } from "../dtos/ITransactionDTO";
import { TransactionsRepository } from "../infra/typeorm/TransactionsRepository";
import { UsersRepository } from "../infra/typeorm/UsersRepository";

@injectable()
export class TransactionService{
    constructor(
        private userRepository: UsersRepository,
        private transactionRepository: TransactionsRepository
    ){}

    public async use(transactionData: ITransactionDTO){
        const payer = await this.userRepository.findUserByEmail(transactionData.payerEmail)
        const receiver = await this.userRepository.findUserByEmail(transactionData.receiverEmail)

        payer.balance -= transactionData.value
        receiver.balance -= -transactionData.value

        this.userRepository.save(payer)
        this.userRepository.save(receiver)

        const x:ICreateTransactionDTO = {
            value: transactionData.value,
            payerId: payer,
            receiverId: receiver,
        }

        const transaction = await this.transactionRepository.createTransaction(x)
        
        return transaction
    }
}