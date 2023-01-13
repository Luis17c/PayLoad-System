import Redis from "ioredis"

import cache from "../../../config/cache";
import { ICacheRepository } from "../ICacheRepository";

export class CacheRepository implements ICacheRepository{
    
    private client: Redis

    constructor(){
        this.client = new Redis(cache.config.redis)
    }

    public async save(key: string, value: string): Promise<void> {
        await this.client.set(key, value)
    }

    public async get(key: string): Promise<string> {
        const info = await this.client.get(key)
        return info
    }

    public async invalidate(prefix: string): Promise<void> {
        const keys = await this.client.keys(`${prefix}:*`)
        const pipeline = this.client.pipeline()
        keys.forEach(key => {
            pipeline.del(key)
        })
        await pipeline.exec()
    }
}