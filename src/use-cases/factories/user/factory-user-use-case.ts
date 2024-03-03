import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { RegisterUseCase } from '../../user/create/register'
import { FetchUsersUseCase } from '../../user/fetch/fetch-users'
import { GetUserProfileUseCase } from '../../user/get-profile/get-user-profile'
import { DeleteUserUseCase } from '../../user/delete/delete-user'
import { EditUserUseCase } from '../../user/update/edit-user'

const usersRepository = new PrismaUsersRepository()

export function makeRegisterUseCase() {
  return new RegisterUseCase(usersRepository)
}

export function makeGetUserProfileUseCase() {
  return new GetUserProfileUseCase(usersRepository)
}

export function makeFetchAllUsersUseCase() {
  return new FetchUsersUseCase(usersRepository)
}

export function makeEditUserUseCase() {
  return new EditUserUseCase(usersRepository)
}

export function makeDeleteUserUseCase() {
  return new DeleteUserUseCase(usersRepository)
}
