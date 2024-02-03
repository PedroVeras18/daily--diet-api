import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'

interface FetchAllUsersUseCaseResponse {
  users: User[]
}

export class FetchAllUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<FetchAllUsersUseCaseResponse> {
    const users = await this.usersRepository.getAll()

    return { users }
  }
}
