import { IUser } from '@/@types/user'
import { UsersRepository } from '@/repositories/users-repository'

interface FetchAllUsersUseCaseResponse {
  users: IUser[]
}

export class FetchAllUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<FetchAllUsersUseCaseResponse> {
    const users = await this.usersRepository.getAll()

    return { users }
  }
}
