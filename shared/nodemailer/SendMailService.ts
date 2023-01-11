import nodemailer from 'nodemailer'
import AppError from '../errors/AppError'
import { ISendMailDTO } from './ISendMailDTO'

export class SendMailService{
    constructor(){
    }

    public async use(mailData: ISendMailDTO){
        try{
        const testAccount = await nodemailer.createTestAccount()
        const transporter = nodemailer.createTransport({
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        })

        const info = await transporter.sendMail({
            from: "testing@testing.com",
            to: mailData.to,
            subject: mailData.subject,
            text: mailData.text
        })
        
        console.log(info)
        console.log(nodemailer.getTestMessageUrl(info))

    }catch(err){throw new AppError(err)}
    }
}