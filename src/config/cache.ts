import { RedisOptions } from "ioredis"

interface ICacheConfig {
    driver: 'redis',

    config: {
        redis: RedisOptions
    }
}

export default {
    driver: 'redis',

    config: {
        redis: {
            host: 'cache',
            port: 6379,
            password: "password",
        },
    
    }
} as ICacheConfig