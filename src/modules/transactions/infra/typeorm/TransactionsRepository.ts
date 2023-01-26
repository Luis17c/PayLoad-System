import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/typeorm/database"; 

import { ITransactionsRepository } from "../../interfaces/ITransactionsRepository";
import { Transactions } from "./Transactions";
import { Users } from "@modules/users/infra/typeorm/Users";

export class TransactionsRepository implements ITransactionsRepository{
    private ormRepository: Repository<Transactions>
    constructor(){
        this.ormRepository = AppDataSource.getRepository('transactions')
    }

    public async createTransaction(data: {value: number, payerId: Users, receiverId: Users}): Promise<Transactions> {
        const transaction = this.ormRepository.create(data)

        await this.ormRepository.save(transaction)

        return transaction
    }

    public async findTransactionById(transactionId: string): Promise<Transactions | null> {
        const transaction = await this.ormRepository.findOne({
            where: { id: transactionId}
        })
        return transaction
    }

    public async save(transaction: Transactions): Promise<void> {
        await this.ormRepository.save(transaction)
    }

    public async listAll(): Promise<Transactions[]> {
        const trans = await this.ormRepository.find()
        return trans
    }

    public async removeTransaction(id:string): Promise<void> {
        const transaction = await this.findTransactionById(id)
        await this.ormRepository.remove(transaction)
    }
}