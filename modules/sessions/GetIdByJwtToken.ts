import { verify } from "jsonwebtoken"

import { jwtConfig } from "../../config/jwtConfig"
import { ITokenData } from "./interfaces/ITokenData"

export default class GetIdByJwtToken{
    constructor(){}

    public async use(bearerToken:string){
        const [, token] = bearerToken.split(" ")

        try{
            const { sub } = verify(token, jwtConfig.key) as ITokenData
            return sub
        }catch(err){
            console.log(err)
        }
    }
}