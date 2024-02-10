import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { RegisterUseCase } from '../user/register'
import { FetchAllUsersUseCase } from '../user/fetch-all-users'
import { GetUserProfileUseCase } from '../user/get-user-profile'
import { DeleteUserUseCase } from '../user/delete-user'
import { EditUserUseCase } from '../user/edit-user'

const usersRepository = new PrismaUsersRepository()

export function makeRegisterUseCase() {
  return new RegisterUseCase(usersRepository)
}

export function makeGetUserProfileUseCase() {
  return new GetUserProfileUseCase(usersRepository)
}

export function makeFetchAllUsersUseCase() {
  return new FetchAllUsersUseCase(usersRepository)
}

export function makeEditUserUseCase() {
  return new EditUserUseCase(usersRepository)
}

export function makeDeleteUserUseCase() {
  return new DeleteUserUseCase(usersRepository)
}
