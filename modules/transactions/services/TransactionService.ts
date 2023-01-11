import { inject, injectable } from "tsyringe";
import { ICreateTransactionDTO } from "../dtos/ICreateTransactionDTO";
import { ITransactionDTO } from "../dtos/ITransactionDTO";
import { IUsersRepository } from "../../users/interfaces/IUsersRepository";
import { ITransactionsRepository } from "../interfaces/ITransactionsRepository";
import { SendMailService } from "../../../shared/nodemailer/SendMailService";
import { send } from "process";
import { ISendMailDTO } from "../../../shared/nodemailer/ISendMailDTO";

@injectable()
export class TransactionService{
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository,
        @inject("TransactionsRepository")
        private transactionsRepository: ITransactionsRepository
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

        const transaction = await this.transactionsRepository.createTransaction(x)

        const mailData: ISendMailDTO = {
            to: [payer.email, receiver.email],
            subject: "Successful transaction",
            text: `Transaction value of ${transaction.value}, from ${payer.name} to ${receiver.name}`
        }

        const sendMail = new SendMailService()
        sendMail.use(mailData)
        
        return transaction
    }
}