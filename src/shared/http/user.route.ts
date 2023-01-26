import { Router } from "express";
import { container } from "tsyringe";

import { UserController } from "@modules/controllers/UserController";

export const userRoute = Router()

const userControler = container.resolve(UserController)

userRoute.post("/create", async (req, res) => {
    await userControler.create(req,res)})

userRoute.get("/list", async (req, res) => {
    await userControler.list(req, res)})

userRoute.put("/remove", async (req, res) => {
    await userControler.remove(req, res)})