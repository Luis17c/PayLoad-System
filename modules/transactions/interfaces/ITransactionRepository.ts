import { ICreateTransactionDTO } from "../dtos/ICreateTransactionDTO";
import { ITransactionDTO } from "../dtos/ITransactionDTO";
import { Transactions } from "../infra/typeorm/Transactions";

export interface ITransactionRepository{
    createTransaction(data:ICreateTransactionDTO): Promise<Transactions>
    findTransactionById(transactionId:string): Promise<Transactions | null>
    save(transaction: Transactions): Promise<null>
}