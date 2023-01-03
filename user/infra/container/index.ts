import { container } from "tsyringe";
import { iUserRepository } from "../../interfaces/iUserRepository";
import { usersRepository } from "../typeorm/usersRepository";

container.registerSingleton<iUserRepository>(
    'usersRepository',
    usersRepository
)