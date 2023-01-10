import { CheckBirthService } from "../CheckBirthService"

describe("Check birth service",()=>{
    it("Should check if user have 18+", ()=>{
        const checkBirth = new CheckBirthService()

        expect(checkBirth.use(new Date("01/01/2023"))).toBe(false)

        expect(checkBirth.use(new Date("12/17/2003"))).toBe(true)

        expect(checkBirth.use(new Date("01/03/2005"))).toBe(true)
    })
})