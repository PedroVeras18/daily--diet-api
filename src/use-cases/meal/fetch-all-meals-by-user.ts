import { Meal } from '@prisma/client'
import { MealsRepository } from '@/repositories/meals-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { UserNotFoundError } from '../errors/user-not-found-error'

interface FetchAllMealsByUserUseCaseRequest {
  page: number
  userId: string
}

interface FetchAllMealsByUserUseCaseResponse {
  meals: Meal[]
}

export class FetchAllMealsByUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private mealsRepository: MealsRepository,
  ) {}

  async execute({
    page,
    userId,
  }: FetchAllMealsByUserUseCaseRequest): Promise<FetchAllMealsByUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const meals = await this.mealsRepository.getAllByUser(userId, page)

    return { meals }
  }
}
