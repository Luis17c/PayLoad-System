import { inject, injectable } from "tsyringe";
import { ITransactionsRepository } from "../interfaces/ITransactionsRepository";

@injectable()
export class ListRemoveService{
    constructor(
        @inject("TransactionsRepository")
        private transactionsRepository: ITransactionsRepository,
    ){}

    public async list(){
        return this.transactionsRepository.listAll()
    }

    public async remove(id){
        this.transactionsRepository.removeTransaction(id)
    }
}