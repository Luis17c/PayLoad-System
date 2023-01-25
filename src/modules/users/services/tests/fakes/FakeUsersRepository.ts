import {v4 as uuidv4} from "uuid"

import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { Users } from "../../../infra/typeorm/Users";
import { IUsersRepository } from "../../../interfaces/IUsersRepository";

export class FakeUsersRepository implements IUsersRepository{
    private fakeRepository: Users[]
    
    constructor(){
        this.fakeRepository = []
    }

    public async createUser(data: ICreateUserDTO): Promise<Users> {
        const user: Users = {
            id: uuidv4(),
            email: data.email,
            name: data.name,
            cpfOrCnpj: data.cpfOrCpnj,
            balance: data.balance,
            shopkeeper: data.shopkeeper,
            password: data.password,
            birth: data.birth,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        this.fakeRepository.push(user)

        return user
    }

    public async save(data: Users): Promise<void> {
    }

    public async findUserByEmail(email: string): Promise<Users> {
        const index = this.fakeRepository.findIndex((user)=>{return user.email == email})
        return this.fakeRepository[index]
    }

    public async findUserByCpfOrCnpj(cpfOrCnpj: string): Promise<Users> {
        const index = this.fakeRepository.findIndex((user)=>{return user.cpfOrCnpj == cpfOrCnpj})
        return this.fakeRepository[index]
    }

    public async findUserById(id: string): Promise<Users> {
        this.fakeRepository.forEach(user => {
            if(user.id = id){
                return user
            }
        })
        return
    }

    public async listAllUsers(): Promise<Users[]> {
        return this.fakeRepository
    }

    public async deleteUser(id: string): Promise<void> {
        this.fakeRepository.forEach(user => {
            if(user.id = id){
                this.fakeRepository.splice(this.fakeRepository.indexOf(user), 1)
            }
        })
    }
}