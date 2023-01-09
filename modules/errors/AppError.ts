export default class AppError{
    public readonly message: string;
    public readonly statusCode: number;

    constructor(messagee:string, statusCode = 400){
        this.message = messagee
        this.statusCode = statusCode
    }
}