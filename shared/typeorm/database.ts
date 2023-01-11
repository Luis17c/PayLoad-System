import "reflect-metadata"
import { DataSource } from "typeorm"
import { Transactions } from "../../modules/transactions/infra/typeorm/Transactions"
import { Users } from "../../modules/users/infra/typeorm/Users"



export const AppDataSource = new DataSource({
    type: "postgres",
    host: "172.18.0.2",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [Users, Transactions],
    migrations: ["./shared/typeorm/migrations/*.ts"],
    subscribers: [],
})

AppDataSource.initialize()