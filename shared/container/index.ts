import { container } from "tsyringe";
import { IUserRepository } from "../../modules/users/interfaces/IUserRepository";
import { UsersRepository } from "../../modules/users/infra/typeorm/UsersRepository";

container.registerSingleton<IUserRepository>(
    'usersRepository',
    UsersRepository
)