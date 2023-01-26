import AppError from "@shared/errors/AppError"

export class CheckEmailService {
    constructor(){}
    private errMsg = new AppError("Invalid E-Mail")
    public use(email:string){
        
        try{
            const emailArray = email.split('@')
            const secEmailArray = emailArray[1].split('.')

            if(emailArray[0].length < 3){
                throw this.errMsg
            }
    
            if(secEmailArray[0].length < 3){
                throw this.errMsg
            }
    
            if(secEmailArray.length == 1){
                throw this.errMsg            
            }

            if(secEmailArray[1].length < 2){
                throw this.errMsg            
            }
        }catch(err){throw this.errMsg}
    }
}