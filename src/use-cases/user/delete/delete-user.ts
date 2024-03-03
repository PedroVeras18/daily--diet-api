import { UsersRepository } from '@/repositories/users-repository'
import { UserNotFoundError } from '../../errors/user/user-not-found-error'

interface DeleteUserUseCaseRequest {
  userId: string
}

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: DeleteUserUseCaseRequest) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    await this.usersRepository.delete(user.id)
  }
}
