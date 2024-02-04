import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { AuthenticateUseCase } from '../auth/authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}
