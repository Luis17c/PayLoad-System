import axios from "axios";

import { Request, Response } from "express";

import { container, inject, injectable } from "tsyringe";

import { extAuth } from "@config/extAuth";
import AppError from "@shared/errors/AppError";
import { ICacheRepository } from "../caching/interfaces/ICacheRepository";
import GetIdByJwtToken from "../sessions/GetIdByJwtToken";
import { ITransactionsRepository } from "../transactions/interfaces/ITransactionsRepository";
import { PreAuthTransactionService } from "../transactions/services/PreAuthTransactionService";
import { RevertTransactionService } from "../transactions/services/RevertTransactionService";
import { TransactionService } from "../transactions/services/TransactionService";

@injectable()
export class TransactionController{
    constructor(
        @inject("TransactionsRepository")
        private transactionsRepository: ITransactionsRepository,

        @inject("CacheRepository")
        private cacheRepository: ICacheRepository,
    ){}

    public async create(req: Request, res: Response){
        const transactionData = req.body
        
        const preAuthTransaction = container.resolve(PreAuthTransactionService)
        const makeTransaction = container.resolve(TransactionService)
    
        await preAuthTransaction.use(transactionData)

        const auth = await (await axios.get(extAuth)).data.message
        if(auth != 'Autorizado'){
            throw new Error("Transaction have been not authorized by external service")
        }

        const transaction = await makeTransaction.use(transactionData)

        await this.cacheRepository.invalidate('transactions')

        res.send(transaction)
    }

    public async list(req: Request, res: Response){
        const getIdByJwtToken = new GetIdByJwtToken()
        const userId = await getIdByJwtToken.use(req.headers.authorization) 
        const transactions = await this.cacheRepository.get(`transactions:${userId}`)
        console.log("hello world")

        if(!transactions){
            const transactions = await this.transactionsRepository.listAll()
            await this.cacheRepository.save(`transactions:${userId}`, JSON.stringify(transactions))
            res.send(transactions)
        }

        res.send(transactions)
    }

    public async revert(req: Request, res: Response){
        const transactionData = req.body
        const revertTransaction = container.resolve(RevertTransactionService)

        const transaction = await revertTransaction.use(transactionData.id)

        await this.cacheRepository.invalidate('transactions')
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