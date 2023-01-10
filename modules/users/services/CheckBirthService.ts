export class CheckBirthService{
    constructor(){}

    use(birthDate:Date){
        const birthInMs = birthDate.getTime()
        
        const diff = Math.floor((Date.now() - birthInMs) / 31557600000)

        if (diff < 18){
            return false
        }

        return true
    }
}