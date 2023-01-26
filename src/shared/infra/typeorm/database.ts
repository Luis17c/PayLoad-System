import "reflect-metadata"

import { DataSource } from "typeorm"

import data from "../../../../ormconfig.json"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: data.host,
    port: data.port,
    username: data.username,
    password: data.password,
    database: data.database,
    synchronize: data.synchronize,
    logging: data.logging,
    entities: data.entities,
    migrations: data.migrations,
    subscribers: data.subscribers,
})

AppDataSource.initialize()