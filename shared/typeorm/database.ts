import "reflect-metadata"
import { DataSource } from "typeorm"
import { Transactions } from "../../user/infra/typeorm/Transactions"
import { Users } from "../../user/infra/typeorm/Users"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "123",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [Users, Transactions],
    migrations: ["./shared/typeorm/migrations/*.ts"],
    subscribers: [],
})

AppDataSource.initialize()