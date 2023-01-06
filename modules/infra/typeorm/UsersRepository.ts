import { Repository } from "typeorm";
import { AppDataSource } from "../../../shared/typeorm/database";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
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

    public async save(data: Users): Promise<null> {
        await this.ormRepository.save(data)
        return
    }

    public async findUserByEmail(userEmail: string): Promise<Users> {
        const user = await this.ormRepository.findOne({
            where: { email: userEmail }
        })
        return user
    }

    public async findUserByCpfOrCnpj(data: string): Promise<Users> {
        const user = await this.ormRepository.findOne({
            where: { cpfOrCnpj : data }
        })
        return user
    }

    public async findUserById(userId: string): Promise<Users | null> {
        const user = await this.ormRepository.findOne({
            where: { id: userId }
        })
        return user
    }
}
