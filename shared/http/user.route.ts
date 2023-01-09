import { Router } from "express";
import { container } from "tsyringe";
import { CheckEmailService } from "../../modules/services/CheckEmailService";
import { CheckUniqueDataService } from "../../modules/services/CheckUniqueDataService";
import { createUserService } from "../../modules/services/CreateUserService";

export const userRoute = Router()

userRoute.post("/create", async (req, res)=>{
    var userData = req.body

    const checkEmail = new CheckEmailService()
    checkEmail.use(userData.email)

    const checkUniqueData = container.resolve(CheckUniqueDataService)
    checkUniqueData.use(userData)

    const createUser = container.resolve(createUserService)
    const createdUser = await createUser.use(userData)
    res.send(createdUser)
})