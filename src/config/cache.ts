import { RedisOptions } from "ioredis"

interface ICacheConfig {
    driver: 'redis',

    config: {
        redis: RedisOptions
    }
}

const root = process.env.TS_NODE_DEV === undefined ? 'dist' : 'src';
const postgresHost = process.env.RUN_DOCKER ? 'cache' : 'localhost';

export default {
    driver: 'redis',

    config: {
        redis: {
            host: process.env.RUN_DOCKER,
            port: 6379,
            password: process.env.POSTGRES_PASSWORD,
        },
    
    }
} as ICacheConfig