import axios from "axios";
import { Router } from "express";
import { container } from "tsyringe";
import { extAuth } from "../../config/extAuth";
import AppError from "../../modules/errors/AppError";
import { PreAuthTransactionService } from "../../modules/services/PreAuthTransactionService";
import { RevertTransactionService } from "../../modules/services/RevertTransactionService";
import { TransactionService } from "../../modules/services/TransactionService";

export const transactionRoute = Router()

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

    try{
        const transaction = await makeTransaction.use(transactionData)
        res.send(transaction)
    }catch(err){console.log(err)}
})

transactionRoute.put('/revert', async (req, res)=>{
    const transactionData = req.body
    const revertTransaction = container.resolve(RevertTransactionService)

    try{
        const transaction = await revertTransaction.use(transactionData.id)
        res.send(transaction)
    }catch(err){console.log(err)}
})