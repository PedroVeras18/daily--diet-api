import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { FetchAllUsersUseCase } from '../user/fetch-all-users'

export function makeFetchAllUsersUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const makeFetchAllUsersUseCase = new FetchAllUsersUseCase(usersRepository)

  return makeFetchAllUsersUseCase
}
