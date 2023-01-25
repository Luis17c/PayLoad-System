import { Router } from "express";

import { sessionRoute } from "./session.route";
import { transactionRoute } from "./transaction.route";
import { userRoute } from "./user.route";

export const mainRoute = Router()

mainRoute.use('/user', userRoute)

mainRoute.use('/transaction', transactionRoute)

mainRoute.use('/session', sessionRoute)