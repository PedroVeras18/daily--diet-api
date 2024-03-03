import { UsersRepository } from '@/repositories/users-repository'
import { Meal } from '@prisma/client'
import { MealsRepository } from '@/repositories/meals-repository'
import { UserNotFoundError } from '../../errors/user/user-not-found-error'

interface CreateMealUseCaseRequest {
  name: string
  description?: string
  isAtDiet?: boolean
  userId: string
}

interface CreateMealUseCaseResponse {
  meal: Meal
}

export class CreateMealUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private mealsRepository: MealsRepository,
  ) {}

  async execute({
    name,
    description,
    isAtDiet,
    userId,
  }: CreateMealUseCaseRequest): Promise<CreateMealUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const meal = await this.mealsRepository.create({
      name,
      description,
      isAtDiet,
      userId,
    })

    return {
      meal,
    }
  }
}
