import "reflect-metadata"

import Express from 'express'
import "express-async-errors"
import cors from 'cors'

import { mainRoute } from './http/main.route'
import { errorHandler } from "./errors/errorHandler"

const app = Express()

app.use(cors())
app.use(Express.json())

app.listen(3000, ()=>{
    console.log("Server on!")
})

app.use(mainRoute)
app.use(errorHandler)
