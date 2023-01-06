import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { Users } from "../infra/typeorm/Users";

export interface IUserRepository {
    createUser(data: ICreateUserDTO): Promise<Users>,

    save(data:Users): Promise<null>,

    findUserByEmail(email: string): Promise<Users | null>,

    findUserByCpfOrCnpj(cpfOrCnpj:string): Promise<Users | null>

    findUserById(id: string): Promise<Users | null>
}