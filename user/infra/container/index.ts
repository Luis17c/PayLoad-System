import { container } from "tsyringe";
import { iUserRepository } from "../../interfaces/IUserRepository";
import { UsersRepository } from "../typeorm/UsersRepository";

container.registerSingleton<iUserRepository>(
    'usersRepository',
    UsersRepository
)