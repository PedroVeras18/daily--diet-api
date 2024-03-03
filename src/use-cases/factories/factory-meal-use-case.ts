import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { CreateMealUseCase } from '../meal/create-meal'
import { FetchMealsByUserUseCase } from '../meal/fetch-meals-by-user'
import { GetMealByIdUseCase } from '../meal/get-meal-by-id'

const usersRepository = new PrismaUsersRepository()
const mealsRepository = new PrismaMealsRepository()

export function makeCreateMealUseCase() {
  return new CreateMealUseCase(usersRepository, mealsRepository)
}

export function makeFetchMealsByUser() {
  return new FetchMealsByUserUseCase(usersRepository, mealsRepository)
}

export function makeGetMealById() {
  return new GetMealByIdUseCase(usersRepository, mealsRepository)
}
