import AppError from "../errors/AppError"

export class CheckEmailService {
    constructor(){}

    use(email:string){
            const emailArray = email.split('@')
            const secEmailArray = emailArray[1].split('.')

            if(emailArray[0].length < 3){
                throw new AppError("This E-Mail is invalid")
            }
    
            if(secEmailArray[0].length < 3){
                throw new AppError("This E-Mail is invalid")
            }
    
            if(secEmailArray.length == 1){
                throw new AppError("This E-Mail is invalid")
            }

            if(secEmailArray[1].length < 2){
                throw new AppError("This E-Mail is invalid")
            }
    }

}