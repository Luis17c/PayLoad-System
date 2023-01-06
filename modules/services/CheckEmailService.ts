export class CheckEmailService {
    constructor(){}

    use(email:string){
        
        try{
            const emailArray = email.split('@')
            const secEmailArray = emailArray[1].split('.')

            if(emailArray[0].length < 3){
                throw new Error("This E-Mail is invalid")
            }
    
            if(secEmailArray[0].length < 3){
                throw new Error("This E-Mail is invalid")
            }
    
            if(secEmailArray.length == 1){
                throw new Error("This E-Mail is invalid")
            }

            if(secEmailArray[1].length < 2){
                throw new Error("This E-Mail is invalid")
            }
        }catch(err){
            throw new Error(err)
        }
    }

}