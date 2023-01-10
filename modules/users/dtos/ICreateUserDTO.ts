export interface ICreateUserDTO{
    email: string,
    cpfOrCpnj: number,
    password: string,
    name: string,
    birth: string | Date,
    shopkeeper: boolean,
    balance: number
}