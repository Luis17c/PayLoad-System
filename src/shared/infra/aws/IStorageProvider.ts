export interface IStorageProvider{
    save():Promise<string>
    delete():Promise<void>
}