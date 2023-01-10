import { Router } from "express";
import { container } from "tsyringe";

import { CheckEmailService } from "../../modules/users/services/CheckEmailService";
import { CheckUniqueDataService } from "../../modules/users/services/CheckUniqueDataService";
import { createUserService } from "../../modules/users/services/CreateUserService";

export const userRoute = Router()


userRoute.post("/create", async (req, res)=>{
    var userData = req.body

    const checkEmail = new CheckEmailService()
    checkEmail.use(userData.email)

    const checkUniqueData = container.resolve(CheckUniqueDataService)
    await checkUniqueData.use(userData.email, userData.cpfOrCnpj)

    const createUser = container.resolve(createUserService)
    const createdUser = await createUser.use(userData)
    res.send(createdUser)
})