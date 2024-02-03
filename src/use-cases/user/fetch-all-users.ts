import { IUser } from '@/@types/user'
import { UsersRepository } from '@/repositories/users-repository'

interface FetchAllUsersUseCaseRequest {
  page: number
}

interface FetchAllUsersUseCaseResponse {
  users: IUser[]
}

export class FetchAllUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    page,
  }: FetchAllUsersUseCaseRequest): Promise<FetchAllUsersUseCaseResponse> {
    const users = await this.usersRepository.getAll(page)

    return { users }
  }
}
