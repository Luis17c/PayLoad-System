import { ICreateTransactionDTO } from "../dtos/ICreateTransactionDTO";
import { Transactions } from "../infra/typeorm/Transactions";

export interface ITransactionsRepository{
    createTransaction(data:ICreateTransactionDTO): Promise<Transactions>
    findTransactionById(transactionId:string): Promise<Transactions | null>
    save(transaction: Transactions): Promise<null>
    listAllTransactions(): Promise<Transactions[]>
    removeTransaction(id: string): Promise<null>
}