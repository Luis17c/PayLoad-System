import "reflect-metadata"

import { DataSource } from "typeorm"

const root = process.env.TS_NODE_DEV === undefined ? 'dist' : 'src';
const postgresHost = process.env.RUN_DOCKER ? 'postgres' : 'localhost';

export const appDataSrc = new DataSource({
    type: 'postgres',
    host: process.env.RUN_DOCKER,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [`./${root}/modules/**/infra/typeorm/entities/*.{js,ts}`],
    migrations: [`./${root}/shared/infra/typeorm/migrations/*.{js,ts}`],
})