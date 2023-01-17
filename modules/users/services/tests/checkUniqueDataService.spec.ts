import "reflect-metadata"

import AppError from "../../../../shared/errors/AppError"
import { CheckUniqueDataService } from "../CheckUniqueDataService"
import { FakeUsersRepository } from "./fakes/FakeUsersRepository"

const fakeRepository = new FakeUsersRepository()

fakeRepository.createUser({
    name: "Luís Cláudio",
    email: "luisclaudio.praado@gmail.com",
    cpfOrCpnj: "cpf-teste",
    password: "senha-teste",
    birth: new Date("12/17/03"),
    shopkeeper: false,
    balance: 5000
})

const checkUniqueData = new CheckUniqueDataService(fakeRepository)

describe("Test unique data service", ()=>{
    it("should return false", async ()=>{
        expect(
            await checkUniqueData.use("luisclaudio.praado@gmail.com", "cpf-teste2")
        ).toBe(false)

        expect(
           await checkUniqueData.use("luisclaudio.praado2@gmail.com", "cpf-teste")
        ).toBe(false)
    })
    
    it("should return true", async ()=>{
        expect(await checkUniqueData.use("luisclaudio.praado2@gmail.com", "cpf-teste2"))
        .toBe(true)
    })
})
