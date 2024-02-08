import { UsersRepository } from '@/repositories/users-repository'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { IEditUser } from '@/@types/user'

interface EditUserUseCaseRequest {
  anInput: IEditUser
}

export class EditUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ anInput }: EditUserUseCaseRequest) {
    const userId = anInput.id

    if (!userId) {
      throw new UserNotFoundError()
    }

    const existingUser = await this.usersRepository.findById(userId)

    if (!existingUser) {
      throw new UserNotFoundError()
    }

    const updatedUser = { ...existingUser, ...anInput }

    await this.usersRepository.save(updatedUser)

    return {
      user: updatedUser,
    }
  }
}
