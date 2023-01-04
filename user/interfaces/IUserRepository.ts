import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { ITransactionDTO } from "../dtos/ITransactionDTO";
import { Users } from "../infra/typeorm/Users";

export interface IUserRepository {
    createUser(data: ICreateUserDTO): Promise<Users>,

    findUserByEmail(email: string): Promise<Users | null>,

    findUserById(id: string): Promise<Users | null>

    changeUserBalance(data: ITransactionDTO): Promise<Users[]>
}