import { Router } from "express";
import { container } from "tsyringe";
import { AuthenticateUserService } from "@modules/sessions/AuthenticateUserService";

export const sessionRoute = Router()

sessionRoute.use('/', async (req, res)=>{
    const {email, password} = req.body
    const authenticateUser = container.resolve(AuthenticateUserService)

    const response = await authenticateUser.use(email, password)

    res.send(response)
})