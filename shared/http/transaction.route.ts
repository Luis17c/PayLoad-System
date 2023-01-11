import axios from "axios";

import { Router } from "express";

import { container, inject, injectable } from "tsyringe";

import { extAuth } from "../../config/extAuth";
import AppError from "../errors/AppError";
import { PreAuthTransactionService } from "../../modules/transactions/services/PreAuthTransactionService";
import { RevertTransactionService } from "../../modules/transactions/services/RevertTransactionService";
import { TransactionService } from "../../modules/transactions/services/TransactionService";
import EnsureAuthMiddle from "../../modules/sessions/EnsureAuthMiddle";
import { ITransactionsRepository } from "../../modules/transactions/interfaces/ITransactionsRepository";
import { ListDeleteTransactionsService } from "../../modules/transactions/services/ListDeleteTransactionsService";

export const transactionRoute = Router()

const ensureAuthMiddle = container.resolve(EnsureAuthMiddle)
transactionRoute.use(ensureAuthMiddle.use)

transactionRoute.post('/create', async (req, res)=>{
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
})

transactionRoute.put('/revert', async (req, res)=>{
    const transactionData = req.body
    const revertTransaction = container.resolve(RevertTransactionService)

        const transaction = await revertTransaction.use(transactionData.id)
        res.send(transaction)
})

transactionRoute.get('/list', async (req, res)=>{
    const listTransactions = container.resolve(ListDeleteTransactionsService)
    const transactions = await listTransactions.list()
    res.send(transactions)
})

transactionRoute.put('/delete', async (req, res)=>{
    const transactionId = req.body.id

    const transactionRepo = container.resolve(ListDeleteTransactionsService)

    await transactionRepo.delete(transactionId)
    if (await transactionRepo.find(transactionId)){
        throw new AppError("Transactions not deleted")
    }

    res.send("Transaction Deleted")
})