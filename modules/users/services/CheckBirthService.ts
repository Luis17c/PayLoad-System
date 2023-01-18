import AppError from "../../../shared/errors/AppError"

export class CheckBirthService{
    constructor(){}

    use(birthDate:Date){
        const birthInMs = birthDate.getTime()
        
        const diff = Math.floor((Date.now() - birthInMs) / 31557600000)

        if (diff < 18){
            throw new AppError("User doesn't have 18 years")
        }
    }
}