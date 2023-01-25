import { container } from "tsyringe";

import { IUsersRepository } from "../../../src/modules/users/interfaces/IUsersRepository";
import { UsersRepository } from "../../../src/modules/users/infra/typeorm/UsersRepository";

import { ITransactionsRepository } from "../../../src/modules/transactions/interfaces/ITransactionsRepository";
import { TransactionsRepository } from "../../../src/modules/transactions/infra/typeorm/TransactionsRepository";

import { ICacheRepository } from "../../../src/modules/caching/interfaces/ICacheRepository";
import { CacheRepository } from "../../../src/modules/caching/redis/CacheRepository";

import { IBcryptProvider } from "../infra/bcrypt/IBcryptProvider";
import { BcryptProvider } from "../infra/bcrypt/BcryptProvider";

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
)

container.registerSingleton<ITransactionsRepository>(
    'TransactionsRepository',
    TransactionsRepository
)

container.registerSingleton<ICacheRepository>(
    'CacheRepository',
    CacheRepository
)

container.registerSingleton<IBcryptProvider>(
    'BcryptProvider',
    BcryptProvider
)