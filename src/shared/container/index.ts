import { container } from 'tsyringe'

import '@shared/container/providers'

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository'

import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository'
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'

import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository'
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository'
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImageRepository'
import { CarsImageRepository } from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository'
import { IRentalsRepository } from '@modules/rentals/infra/typeorm/repositories/IRentalsRepository'
import { RentalsRepository } from '@modules/rentals/repositories/RentalsRepository'


container.registerSingleton<ICategoriesRepository> (
    "CategoriesRepository",
    CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository> (
    "SpecificationsRepository",
    SpecificationsRepository
)

container.registerSingleton<IUserRepository> (
    "UserRepository",
    UserRepository
)

container.registerSingleton<ICarsRepository>(
    "CarsRepository",
    CarsRepository
)

container.registerSingleton<ICarsImagesRepository>(
    "CarsImageRepository",
    CarsImageRepository
)

container.registerSingleton<IRentalsRepository>(
    "RentalsRepository",
    RentalsRepository
)