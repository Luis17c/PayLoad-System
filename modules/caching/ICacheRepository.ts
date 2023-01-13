export interface ICacheRepository{
    save(key: string, value: string):Promise<void>
    get(ket: string):Promise<string>
    invalidate(key: string):Promise<void>
}