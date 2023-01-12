import { Repository } from "typeorm";

import { AppDataSource } from "../../../../shared/typeorm/database";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../interfaces/IUsersRepository";
import { Users } from "./Users";

export class UsersRepository implements IUsersRepository{
    private ormRepository: Repository<Users>
    constructor(){
        this.ormRepository = AppDataSource.getRepository('users')
    }

    public async createUser(data: ICreateUserDTO): Promise<Users> {
        const user = this.ormRepository.create(data)

        await this.ormRepository.save(user)

        return user
    }

    public async save(data: Users): Promise<null> {
        await this.ormRepository.save(data)
        return
    }

    public async findUserByEmail(userEmail: string): Promise<Users | null> {
        const user = await this.ormRepository.findOne({
            where: { email: userEmail }
        })
        return user
    }

    public async findUserByCpfOrCnpj(cpfOrCnpj: string): Promise<Users | null> {
        const user = await this.ormRepository.findOne({
            where: { cpfOrCnpj }
        })
        return user
    }

    public async findUserById(id: string): Promise<Users | null> {
        const user = await this.ormRepository.findOne({
            where: { id }
        })
        return user
    }

    public async listAllUsers(): Promise<Users[]> {
        return await this.ormRepository.find()
    }

    public async deleteUser(id: string): Promise<null> {
        const user = await this.findUserById(id)
        await this.ormRepository.remove(user)
        return 
    }
}
