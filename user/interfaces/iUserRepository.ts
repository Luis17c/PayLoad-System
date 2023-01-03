import { iCreateUserDTO } from "../dtos/iCreateUserDTO";
import { users } from "../infra/typeorm/users";

export interface iUserRepository {
    createUser(data: iCreateUserDTO): Promise<users>,
    findUserByEmail(email: string): Promise<users | null>,
}