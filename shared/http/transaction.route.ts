import { Router } from "express";
import { container } from "tsyringe";

import { TransactionController } from "../../modules/controllers/TransactionController";
import EnsureAuthMiddle from "../../modules/sessions/EnsureAuthMiddle";

export const transactionRoute = Router()

const transactionController = container.resolve(TransactionController)

const ensureAuthMiddle = container.resolve(EnsureAuthMiddle)
transactionRoute.use(ensureAuthMiddle.use)

transactionRoute.post('/create', async (req, res)=>{
    await transactionController.create(req, res)})

transactionRoute.put('/revert', async (req, res)=>{
    await transactionController.revert(req, res)})

transactionRoute.get('/list', async (req, res)=>{
    await transactionController.list(req, res)})

transactionRoute.put('/remove', async (req, res)=>{
    await transactionController.remove(req, res)})