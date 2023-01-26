import { container } from "tsyringe";

import { IUsersRepository } from "@modules/users/interfaces/IUsersRepository";
import { UsersRepository } from "@modules/users/infra/typeorm/UsersRepository";

import { ITransactionsRepository } from "@modules/transactions/interfaces/ITransactionsRepository";
import { TransactionsRepository } from "@modules/transactions/infra/typeorm/TransactionsRepository";

import { ICacheRepository } from "@modules/caching/interfaces/ICacheRepository";
import { CacheRepository } from "@modules/caching/redis/CacheRepository";

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