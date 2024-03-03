import { IUser } from '@/@types/user'
import { UsersRepository } from '@/repositories/users-repository'

interface FetchUsersUseCaseRequest {
  page: number
}

interface FetchUsersUseCaseResponse {
  users: IUser[]
}

export class FetchUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    page,
  }: FetchUsersUseCaseRequest): Promise<FetchUsersUseCaseResponse> {
    const users = await this.usersRepository.getAll(page)

    return { users }
  }
}
