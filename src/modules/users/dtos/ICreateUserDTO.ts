export interface ICreateUserDTO{
    email: string,
    cpfOrCpnj: string,
    password: string,
    name: string,
    birth: Date,
    shopkeeper: boolean,
    balance: number
}