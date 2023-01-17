export class CheckEmailService {
    constructor(){}

    public use(email:string){
        try{
            const emailArray = email.split('@')
            const secEmailArray = emailArray[1].split('.')

            if(emailArray[0].length < 3){
                return false
            }
    
            if(secEmailArray[0].length < 3){
                return false
            }
    
            if(secEmailArray.length == 1){
                return false            
            }

            if(secEmailArray[1].length < 2){
                return false            
            }
            return true
        }catch(err){return false}
    }
}