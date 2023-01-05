import { Router } from "express";
import { container } from "tsyringe";
import { CheckEmailService } from "../../modules/services/CheckEmailService";
import { createUserService } from "../../modules/services/CreateUserService";

export const userRoute = Router()

userRoute.post("/", async (req, res)=>{
    var userData = req.body

    const checkEmail = new CheckEmailService()

    const emailIsValid = checkEmail.use(userData.email)

    if(!emailIsValid){
        throw new Error ("E-Mail is not valid")
    }

    try{
        const createUser = container.resolve(createUserService)

        const createdUser = await createUser.use(userData)

        res.send(createdUser)

    }catch(err){console.log(err)}
})