import "reflect-metadata"
import { DataSource } from "typeorm"
import { users } from "../../user/infra/typeorm/users"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "123",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [users],
    migrations: ["./shared/typeorm/migrations/*.ts"],
    subscribers: [],
})

AppDataSource.initialize()