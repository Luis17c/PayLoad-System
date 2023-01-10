import { NextFunction, Request, Response } from "express";
import AppError from "./AppError";

export const errorHandler = function (err: Error, req: Request, res: Response, next: NextFunction){
    if (err instanceof AppError){
        res.status(err.statusCode).send(err.message)
    }else{
        res.status(500).send("Internal server error")
    }
}  