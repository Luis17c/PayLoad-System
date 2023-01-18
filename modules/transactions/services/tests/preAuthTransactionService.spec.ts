import "reflect-metadata"

import { FakeUsersRepository } from "../../../users/services/tests/fakes/FakeUsersRepository";
import { PreAuthTransactionService } from "../PreAuthTransactionService";

describe("Testing pre auth service", ()=>{
    const fakeUsersRepository = new FakeUsersRepository()
    fakeUsersRepository.createUser({
        name: "Test Name",
        email: "test@test.com",
        password: "testPass",
        balance: 5000,
        cpfOrCpnj: "testcpf",
        birth: new Date(),
        shopkeeper: false
    })
    fakeUsersRepository.createUser({
        name: "Test Name 2",
        email: "test2@test.com",
        password: "testPass",
        balance: 5000,
        cpfOrCpnj: "testcpf",
        birth: new Date(),
        shopkeeper: true
    })

    const preAuthTransaction = new PreAuthTransactionService(fakeUsersRepository)

    it("should return that shopkeppers don't make transactions", async ()=>{
        expect(await preAuthTransaction.use({
            value: 100, 
            payerEmail: "test2@test.com", 
            receiverEmail: "test@test.com"
        })).toBe("Shopkeepers cannot make transactions")
    })
    it("should return that user doesn't have enough balance", async ()=>{
        expect(await preAuthTransaction.use({
            value: 6000, 
            payerEmail: "test@test.com", 
            receiverEmail: "test2@test.com"
        })).toBe("Balance isn't enought")
    })
    it("should return that receiver user doesn't exists", async ()=>{
        expect(await preAuthTransaction.use({
            value: 100, 
            payerEmail: "test3@test.com", 
            receiverEmail: "test@test.com"
        })).toBe("User not found")
    })
    it("should return that receiver user doesn't exists", async ()=>{
        expect(await preAuthTransaction.use({
            value: 100, 
            payerEmail: "test@test.com", 
            receiverEmail: "test3@test.com"
        })).toBe("User not found")
    })
    it("should authorizate transaction", async ()=>{
        expect(await preAuthTransaction.use({
            value: 100, 
            payerEmail: "test@test.com", 
            receiverEmail: "test2@test.com"
        })).toBe(undefined)
    })
})