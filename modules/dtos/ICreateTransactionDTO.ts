import { Users } from "../infra/typeorm/Users";

export interface ICreateTransactionDTO{
    value: number,
    payerId: Users,
    receiverId: Users,
}