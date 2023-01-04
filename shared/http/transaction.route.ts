import axios from "axios";
import { Router } from "express";
import { container } from "tsyringe";
import { PreAuthTransactionService } from "../../user/services/PreAuthTransactionService";
import { TransactionService } from "../../user/services/TransactionService";

export const transactionRoute = Router()

transactionRoute.post('/', async (req, res)=>{
    const transactionData = req.body
    const preAuthTransaction = container.resolve(PreAuthTransactionService)
    const makeTransaction = container.resolve(TransactionService)

    try{
        const preAuth = preAuthTransaction.use(transactionData)

        if(!preAuth){
            throw new Error("Transaction isn't pre authorized")
        }
    }catch(err){console.log(err)}

    try{
        const auth = await (await axios.get("https://run.mocky.io/v3/8fafdd68-a090-496f-8c9a-3442cf30dae6")).data
        if(auth != 'Autorizado'){
            throw new Error("Transaction have been not authorized by external service")
        }
    }catch(err){console.log(err)}

    
})