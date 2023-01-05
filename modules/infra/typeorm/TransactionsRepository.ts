import { Repository } from "typeorm";
import { AppDataSource } from "../../../shared/typeorm/database";
import { ICreateTransactionDTO } from "../../dtos/ICreateTransactionDTO";
import { ITransactionDTO } from "../../dtos/ITransactionDTO";
import { ITransactionRepository } from "../../interfaces/ITransactionRepository";
import { Transactions } from "./Transactions";

export class TransactionsRepository implements ITransactionRepository{
    private ormRepository: Repository<Transactions>
    constructor(){
        this.ormRepository = AppDataSource.getRepository('transactions')
    }

    public async createTransaction(data: ICreateTransactionDTO): Promise<Transactions> {
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

    public async save(transaction: Transactions): Promise<null> {
        await this.ormRepository.save(transaction)
        return
    }
}