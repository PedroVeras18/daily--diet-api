import { Meal } from '@prisma/client'
import { MealsRepository } from '../meals-repository'
import { randomUUID } from 'crypto'

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

  async delete(mealId: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === mealId)
    this.items.splice(itemIndex, 1)
  }
}
