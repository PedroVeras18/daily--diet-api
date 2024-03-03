import { Meal } from '@prisma/client'
import { MealsRepository } from '@/repositories/meals-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { MealNotFoundError } from '../errors/meal-not-found-error'

interface GetMealByIdUseCaseRequest {
  userId: string
  mealId: string
}

interface GetMealByIdUseCaseResponse {
  meal: Meal
}

export class GetMealByIdUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private mealsRepository: MealsRepository,
  ) {}

  async execute({
    userId,
    mealId,
  }: GetMealByIdUseCaseRequest): Promise<GetMealByIdUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const meal = await this.mealsRepository.findById(mealId)

    if (!meal) {
      throw new MealNotFoundError()
    }

    return { meal }
  }
}
