import { Repository } from "typeorm";
import { AppDataSource } from "../../../shared/typeorm/database";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { ITransactionDTO } from "../../dtos/ITransactionDTO";
import { IUserRepository } from "../../interfaces/IUserRepository";
import { Users } from "./Users";

export class UsersRepository implements IUserRepository{
    private ormRepository: Repository<Users>
    constructor(){
        this.ormRepository = AppDataSource.getRepository('users')
    }

    public async createUser(data: ICreateUserDTO): Promise<Users> {
        const user = this.ormRepository.create(data)

        await this.ormRepository.save(user)

        return user
    }

    public async findUserByEmail(userEmail: string): Promise<Users> {
        const user = await this.ormRepository.findOne({
            where: { email: userEmail }
        })
        return user
    }

    public async findUserById(userId: string): Promise<Users | null> {
        const user = await this.ormRepository.findOne({
            where: { id: userId }
        })
        return user
    }

    public async changeUserBalance(data: ITransactionDTO): Promise<Users[]> {
        const payer = await this.ormRepository.findOne({
            where: { id: data.payerEmail }
        })

        const receiver = await this.ormRepository.findOne({
            where: { id: data.receiverEmail }
        })

        payer.balance = (payer.balance - data.value)
        receiver.balance = (receiver.balance + data.value)

        await this.ormRepository.save(payer)
        await this.ormRepository.save(receiver)

        return [payer, receiver]
    }
}