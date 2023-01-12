import axios from "axios";
import { Request, Response } from "express";
import { container, inject, injectable } from "tsyringe";
import { extAuth } from "../../config/extAuth";
import AppError from "../../shared/errors/AppError";
import { ITransactionsRepository } from "../transactions/interfaces/ITransactionsRepository";
import { PreAuthTransactionService } from "../transactions/services/PreAuthTransactionService";
import { RevertTransactionService } from "../transactions/services/RevertTransactionService";
import { TransactionService } from "../transactions/services/TransactionService";

@injectable()
export class TransactionController{
    constructor(
        @inject("TransactionsRepository")
        private transactionsRepository: ITransactionsRepository
    ){}

    public async create(req: Request, res: Response){
        const transactionData = req.body
    
        const preAuthTransaction = container.resolve(PreAuthTransactionService)
        const makeTransaction = container.resolve(TransactionService)
    
        const preAuth = await preAuthTransaction.use(transactionData)
        if(!preAuth){
            throw new AppError("Transaction isn't pre authorized", )
        }

        const auth = await (await axios.get(extAuth)).data.message
        if(auth != 'Autorizado'){
            throw new Error("Transaction have been not authorized by external service")
        }

        const transaction = await makeTransaction.use(transactionData)
        res.send(transaction)
    }

    public async list(req: Request, res: Response){
        const transactions = await this.transactionsRepository.listAll()
        res.send(transactions)
    }

    public async revert(req: Request, res: Response){
        const transactionData = req.body
        const revertTransaction = container.resolve(RevertTransactionService)

        const transaction = await revertTransaction.use(transactionData.id)
        res.send(transaction)
    }

    public async remove(req:Request, res:Response){
        const transactionId = req.body.id

        const transaction = await this.transactionsRepository.findTransactionById(transactionId)

        if (!transaction){
            throw new AppError("Transaction doesn't exists")
        } 

        await this.transactionsRepository.removeTransaction(transactionId)

        if (await this.transactionsRepository.findTransactionById(transactionId)){
            throw new AppError("Transactions not deleted")
        }
    
        res.send("Transaction Deleted")
    }
}