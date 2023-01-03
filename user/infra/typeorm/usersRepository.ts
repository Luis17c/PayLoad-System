import { Repository } from "typeorm";
import { AppDataSource } from "../../../shared/typeorm/database";
import { iCreateUserDTO } from "../../dtos/iCreateUserDTO";
import { iUserRepository } from "../../interfaces/iUserRepository";
import { users } from "./users";

export class usersRepository implements iUserRepository{
    private ormRepository: Repository<users>
    constructor(){
        this.ormRepository = AppDataSource.getRepository('users')
    }

    public async createUser(data: iCreateUserDTO): Promise<users> {
        const user = this.ormRepository.create(data)

        await this.ormRepository.save(user)

        return user
    }

    public async findUserByEmail(email: string): Promise<users> {
        const user = await this.ormRepository.findOne({
            where: { email }
        })
        return user
    }
}