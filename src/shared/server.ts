import "reflect-metadata"
import "dotenv/config"

import Express from 'express'
import "express-async-errors"

import cors from 'cors'

import "./container"

import { mainRoute } from './http/main.route'
import { errorHandler } from "./errors/errorHandler"
import { appDataSrc } from "./infra/typeorm/database"

const app = Express()

app.use(cors())
app.use(Express.json())

app.use(mainRoute)
app.use(errorHandler)

appDataSrc.initialize()
    .then(async () => {
        await appDataSrc.synchronize()

        app.listen(3030, ()=>{
            console.log("Server on!")
        })
    })
    .catch((err) => {
        console.log(err)
    })
