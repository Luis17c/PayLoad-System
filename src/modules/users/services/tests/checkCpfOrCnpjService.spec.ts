import { CheckAndFormatCpfOrCnpjService } from "../CheckCpfOrCnpjService";

const checkCpfOrCnpj = new CheckAndFormatCpfOrCnpjService()

describe("Check and format cpf or cnpj", ()=>{
    test("should return cpf and cnpj formated", async ()=>{
        expect(await checkCpfOrCnpj.use("24212010399")).toBe("242.120.103-99")
        expect(await checkCpfOrCnpj.use("23196281000103")).toBe("23.196.281/0001-03")
    })
})