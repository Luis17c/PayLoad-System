import { container } from "tsyringe";

import { IUsersRepository } from "../../modules/users/interfaces/IUsersRepository";
import { UsersRepository } from "../../modules/users/infra/typeorm/UsersRepository";
import { ITransactionsRepository } from "../../modules/transactions/interfaces/ITransactionsRepository";
import { TransactionsRepository } from "../../modules/transactions/infra/typeorm/TransactionsRepository";

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
)

container.registerSingleton<ITransactionsRepository>(
    'TransactionsRepository',
    TransactionsRepository
)