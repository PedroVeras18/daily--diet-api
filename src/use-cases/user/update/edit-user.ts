import { UsersRepository } from '@/repositories/users-repository'
import { UserNotFoundError } from '../../errors/user/user-not-found-error'
import { IEditUser } from '@/@types/user'

interface EditUserUseCaseRequest {
  anId: string
  anInput: IEditUser
}

export class EditUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ anId, anInput }: EditUserUseCaseRequest) {
    const existingUser = await this.usersRepository.findById(anId)

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
