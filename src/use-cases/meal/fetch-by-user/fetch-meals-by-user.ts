import { Meal } from '@prisma/client'
import { MealsRepository } from '@/repositories/meals-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { UserNotFoundError } from '../../errors/user/user-not-found-error'

interface FetchMealsByUserUseCaseRequest {
  page: number
  userId: string
}

interface FetchMealsByUserUseCaseResponse {
  meals: Meal[]
}

export class FetchMealsByUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private mealsRepository: MealsRepository,
  ) {}

  async execute({
    page,
    userId,
  }: FetchMealsByUserUseCaseRequest): Promise<FetchMealsByUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const meals = await this.mealsRepository.fetchByUser(userId, page)

    return { meals }
  }
}
