import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import { ITransactionsRepository } from "../interfaces/ITransactionsRepository";

@injectable()
export class ListDeleteTransactionsService{
    constructor(
        @inject('TransactionsRepository')
        private transactionsRepository: ITransactionsRepository
    ){}

    public async list(){
        const transactions = await this.transactionsRepository.listAllTransactions()
        return transactions
    }

    public async find(id:string){
        const transaction = await this.transactionsRepository.findTransactionById(id)
        return transaction
    }

    public async delete(transactionId:string){
        const transaction = await this.find(transactionId)
        if (!transaction){
            throw new AppError("Transaction doesn't exists")
        } 
        await this.transactionsRepository.removeTransaction(transactionId)
    }
}