import { MealsRepository } from '@/repositories/meals-repository'
import { MealNotFoundError } from '@/use-cases/errors/meal/meal-not-found-error'

interface DeleteMealUseCaseRequest {
  mealId: string
}

export class DeleteMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({ mealId }: DeleteMealUseCaseRequest): Promise<void> {
    const meal = await this.mealsRepository.findById(mealId)

    if (!meal) {
      throw new MealNotFoundError()
    }

    await this.mealsRepository.delete(meal.id)
  }
}
