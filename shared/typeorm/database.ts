import "reflect-metadata"
import { DataSource } from "typeorm"
import { Transactions } from "../../modules/infra/typeorm/Transactions"
import { Users } from "../../modules/infra/typeorm/Users"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "0.0.0.0",
    port: 5432,
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