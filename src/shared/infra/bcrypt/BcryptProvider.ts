import { compare, hash } from "bcrypt";
import { IBcryptProvider } from "./IBcryptProvider";

export class BcryptProvider implements IBcryptProvider{
    constructor (){}

    public async hash(password: string): Promise<string> {
        const hashedPass = await hash(password, 10)
        return hashedPass
    }

    public async compare(password: string, hash: string): Promise<boolean> {
        const boolCompared = await compare(password, hash)
        return boolCompared
    }
}