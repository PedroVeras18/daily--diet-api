import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { DeleteUserUseCase } from '../user/delete-user'

export function makeDeleteUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const makeDeleteUserUseCase = new DeleteUserUseCase(usersRepository)

  return makeDeleteUserUseCase
}
