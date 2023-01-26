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
            host: '172.18.0.3',
            port: 6379,
            password: "password",
        },
    
    }
} as ICacheConfig