import { CheckEmailService } from "../CheckEmailService"

describe("Check if email is valid", ()=>{
    it('should check if this is a valid email', ()=>{
        const checkEmail = new CheckEmailService
        expect(checkEmail.use("luisclaudio.praado@gmail.com")).toBe(true)
        })
    it('should test all invalid email shapes', ()=>{
        const checkEmail = new CheckEmailService
        expect(checkEmail.use("luisclaudiopraadogmail.com")).toBe(false)
        expect(checkEmail.use("luisclaudio.praado@gmailcom")).toBe(false)
        expect(checkEmail.use("lu@gmail.com")).toBe(false)
        expect(checkEmail.use("luisclaudio.praado@gm.com")).toBe(false)
        expect(checkEmail.use("luisclaudio.praado@gmail.m")).toBe(false)
        })
    })