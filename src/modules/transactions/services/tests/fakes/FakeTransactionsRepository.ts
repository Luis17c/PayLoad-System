import { v4 as uuidv4 } from "uuid"

import { Transactions } from "../../../infra/typeorm/entities/Transactions";
import { ITransactionsRepository } from "../../../interfaces/ITransactionsRepository";

export class FakeTransactionsRepository implements ITransactionsRepository{
    private fakeRepository: Transactions[]

    constructor(){
        this.fakeRepository = []
    }

    public async createTransaction(data): Promise<Transactions> {
        const transaction:Transactions = {
            id: uuidv4(),
            value: data.value,
            payerId: data.payerId,
            receiverId: data.receiverId,
            madeAt: new Date(),
            revertedAt: null
        }

        this.fakeRepository.push(transaction)

        return transaction
    }

    public async findTransactionById(transactionId: string): Promise<Transactions | null> {
        this.fakeRepository.forEach(transaction => {
            if(transaction.id = transactionId){
                return transaction
            }
        })
        return
    }

    public async removeTransaction(id: string): Promise<void> {
        this.fakeRepository.forEach(transaction => {
            if(transaction.id = id){
                this.fakeRepository.splice(this.fakeRepository.indexOf(transaction), 1)
            }
        })
    }

    public async save(transaction: Transactions): Promise<void> {
        await this.removeTransaction(transaction.id)
        await this.createTransaction(transaction)
    }

    public async listAll(): Promise<Transactions[]> {
        return this.fakeRepository
    }

}