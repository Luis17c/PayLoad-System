import { Router } from "express";
import { transactionRoute } from "./transaction.route";
import { userRoute } from "./user.route";

export const mainRoute = Router()

mainRoute.use('/user', userRoute)

mainRoute.use('/transaction', transactionRoute)