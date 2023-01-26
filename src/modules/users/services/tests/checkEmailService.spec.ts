import AppError from "@shared/errors/AppError"
import { CheckEmailService } from "../CheckEmailService"

const checkEmail = new CheckEmailService
describe("Check if email is valid", ()=>{
    it('should check if this is a valid email', ()=>{
        expect(checkEmail.use("luisclaudio.prado@gmail.com")).toBe(undefined)
    })
    it('should return that e-mail is invalid', ()=>{
        expect(checkEmail.use("luisclaudiopraadogmail.com")).toBe(AppError)
    }) 
    it('should return that e-mail is invalid', ()=>{
        expect(checkEmail.use("luisclaudio.praado@gmailcom")).toBe(AppError)
    })
    it('should return that e-mail is invalid', ()=>{
        expect(checkEmail.use("lu@gmail.com")).toBe(AppError)
    })
    it('should return that e-mail is invalid', ()=>{
        expect(checkEmail.use("luisclaudio.praado@gm.com")).toBe(AppError)
    })
    it('should return that e-mail is invalid', ()=>{
        expect(checkEmail.use("luisclaudio.praado@gmail.m")).toBe(AppError)
    })
})
