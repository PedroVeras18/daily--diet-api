import { Meal } from '@prisma/client'
import { MealsRepository } from '../meals-repository'
import { randomUUID } from 'crypto'
import { GetMetricsUseCaseResponse } from '@/use-cases/meal/metrics/get-metrics'

export class InMemoryMealsRepository implements MealsRepository {
  public items: Meal[] = []

  async create(data: Meal): Promise<Meal> {
    const meal: Meal = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description,
      isAtDiet: data.isAtDiet,
      created_at: new Date(),
      userId: data.userId,
    }

    this.items.push(meal)

    return meal
  }

  async fetchByUser(userId: string, page: number) {
    return this.items
      .filter((item) => item.userId === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async findById(mealId: string) {
    const foundMeal = this.items.find((item) => item.id === mealId)
    return foundMeal || null
  }

  async save(anInput: Meal): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === anInput.id)

    this.items[itemIndex] = anInput
  }

  async delete(mealId: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === mealId)
    this.items.splice(itemIndex, 1)
  }

  async getMetrics(userId: string): Promise<GetMetricsUseCaseResponse> {
    const mealsFilteredByUser = this.items.filter(
      (item) => item.userId === userId,
    )

    const totalMealsInDiet = mealsFilteredByUser.filter(
      (item) => item.isAtDiet === true,
    )

    const totalMealsOutsideDiet = mealsFilteredByUser.filter(
      (item) => item.isAtDiet === false,
    )

    let bestSequenceMealsWithinDiet = 0
    let currentDietSequence = 0

    for (const meal of totalMealsInDiet) {
      if (meal.isAtDiet) {
        currentDietSequence++
        bestSequenceMealsWithinDiet = Math.max(
          bestSequenceMealsWithinDiet,
          currentDietSequence,
        )
      } else {
        currentDietSequence = 0
      }
    }

    return {
      totalMealsRecorded: mealsFilteredByUser.length,
      totalMealsInDiet: totalMealsInDiet.length,
      totalMealsOutsideDiet: totalMealsOutsideDiet.length,
      bestSequenceMealsWithinDiet,
    }
  }
}
