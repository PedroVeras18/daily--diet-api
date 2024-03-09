import { Prisma } from '@prisma/client'
import { MealsRepository } from '@/repositories/meals-repository'
import { MealNotFoundError } from '../../errors/meal/meal-not-found-error'

interface UpdateMealUseCaseRequest {
  anId: string
  anInput: Prisma.MealUncheckedUpdateInput
}

export class UpdateMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({ anId, anInput }: UpdateMealUseCaseRequest) {
    const existingMeal = await this.mealsRepository.findById(anId)

    if (!existingMeal) {
      throw new MealNotFoundError()
    }

    const updatedMeal = { ...existingMeal, ...anInput }

    await this.mealsRepository.save(updatedMeal)
  }
}
