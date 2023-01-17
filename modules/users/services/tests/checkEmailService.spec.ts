import { CheckEmailService } from "../CheckEmailService"

const checkEmail = new CheckEmailService
describe("Check if email is valid", ()=>{
    it('should check if this is a valid email', ()=>{
        expect(checkEmail.use("luisclaudio.prado@gmail.com")).toBe(true)
        })
    it('should return false', ()=>{
        expect(checkEmail.use("luisclaudiopraadogmail.com")).toBe(false)
        expect(checkEmail.use("luisclaudio.praado@gmailcom")).toBe(false)
        expect(checkEmail.use("lu@gmail.com")).toBe(false)
        expect(checkEmail.use("luisclaudio.praado@gm.com")).toBe(false)
        expect(checkEmail.use("luisclaudio.praado@gmail.m")).toBe(false)
        })
    })