import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { CreateMealUseCase } from '../meal/create-meal'

const usersRepository = new PrismaUsersRepository()
const mealsRepository = new PrismaMealsRepository()

export function makeCreateMealUseCase() {
  return new CreateMealUseCase(usersRepository, mealsRepository)
}
