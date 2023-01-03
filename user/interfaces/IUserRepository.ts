import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { Users } from "../infra/typeorm/Users";

export interface IUserRepository {
    createUser(data: ICreateUserDTO): Promise<Users>,
    findUserByEmail(email: string): Promise<Users | null>,
}