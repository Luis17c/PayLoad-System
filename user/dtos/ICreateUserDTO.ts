export interface ICreateUserDTO{
    email: string,
    cpfOrCpnj: string,
    password: string,
    name: string,
    birth: string | Date,
}