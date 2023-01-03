import { Router } from "express";
import { userRoute } from "./user.route";

export const mainRoute = Router()

mainRoute.use('/user', userRoute)