import { Router } from "express";
import { container } from "tsyringe";

import { UserController } from "../../modules/controllers/UserController";

export const userRoute = Router()

const userControler = container.resolve(UserController)

userRoute.post("/create", userControler.create)

userRoute.get("/list", userControler.list)

userRoute.put("/remove", userControler.remove)