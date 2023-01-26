import { Users } from "@modules/users/infra/typeorm/entities/Users";

import { Transactions } from "../infra/typeorm/entities/Transactions";

export interface ITransactionsRepository{
    createTransaction(data:{value: number, payerId: Users, receiverId: Users}): Promise<Transactions>
    findTransactionById(transactionId:string): Promise<Transactions | null>
    save(transaction: Transactions): Promise<void>
    listAll(): Promise<Transactions[]>
    removeTransaction(id: string): Promise<void>
}