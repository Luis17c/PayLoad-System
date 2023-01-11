import { Router } from "express";
import { container } from "tsyringe";
import { ListDeleteTransactionsService } from "../../modules/transactions/services/ListDeleteTransactionsService";
import { CheckAndFormatCpfOrCnpjService } from "../../modules/users/services/CheckCpfOrCnpjService";

import { CheckEmailService } from "../../modules/users/services/CheckEmailService";
import { CheckUniqueDataService } from "../../modules/users/services/CheckUniqueDataService";
import { createUserService } from "../../modules/users/services/CreateUserService";
import { ListDeleteUsers } from "../../modules/users/services/ListDeleteUsers";
import AppError from "../errors/AppError";

export const userRoute = Router()

userRoute.post("/create", async (req, res)=>{
    var userData = req.body

    const checkEmail = new CheckEmailService()
    checkEmail.use(userData.email)

    const checkAndFormatCpfOrCnpj = new CheckAndFormatCpfOrCnpjService()
    const checkedCpfOrCnpj = await checkAndFormatCpfOrCnpj.use(userData.cpfOrCnpj)
    console.log(checkedCpfOrCnpj)
    userData.cpfOrCnpj = checkedCpfOrCnpj

    const checkUniqueData = container.resolve(CheckUniqueDataService)
    await checkUniqueData.use(userData.email, userData.cpfOrCnpj)

    const createUser = container.resolve(createUserService)
    const createdUser = await createUser.use(userData)
    res.send(createdUser)
})

userRoute.get("/list", async (req, res)=>{
    const listUsers = container.resolve(ListDeleteUsers)
    const users = await listUsers.list()
    res.send(users)
})

userRoute.put("/delete", async (req, res)=>{
    const userId = req.body.id
    const deleteUser = container.resolve(ListDeleteUsers)
    await deleteUser.delete(userId)
    const user = await deleteUser.find(userId)
    if(user){
        throw new AppError("User has been not deleted")
    }
    res.send("User Deleted")
})