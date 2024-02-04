import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { GetUserProfileUseCase } from '../user/get-user-profile'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const makeGetUserProfileUseCase = new GetUserProfileUseCase(usersRepository)

  return makeGetUserProfileUseCase
}
