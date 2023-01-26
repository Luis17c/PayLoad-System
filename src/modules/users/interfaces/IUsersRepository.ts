import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { Users } from "../infra/typeorm/entities/Users";

export interface IUsersRepository {
    createUser(data: ICreateUserDTO): Promise<Users>,

    save(data:Users): Promise<void>,

    findUserByEmail(email: string): Promise<Users | null>,

    findUserByCpfOrCnpj(cpfOrCnpj:string): Promise<Users | null>,

    findUserById(id: string): Promise<Users | null>

    listAllUsers(): Promise<Users[]>

    deleteUser(id: string): Promise<void>
}