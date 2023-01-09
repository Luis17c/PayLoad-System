import "reflect-metadata"
import Express, { NextFunction, Request, response, Response } from 'express'
import cors from 'cors'
import { mainRoute } from './http/main.route'
import AppError from "../modules/errors/AppError"

const app = Express()

app.use(cors())
app.use(Express.json())

app.listen(3000, ()=>{
    console.log("Server on!")
})

app.use('/', mainRoute)
app.use((err: Error, req:Request, res: Response, next: NextFunction)=>{
    if (err instanceof AppError){
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message
        })
    }
    
    return res.status(500).json({
        status: "error",
        message: "Internal server error"
    })
})