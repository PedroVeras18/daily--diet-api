import { Meal } from '@prisma/client'
import { MealsRepository } from '../meals-repository'
import { randomUUID } from 'crypto'

export class InMemoryMealsRepository implements MealsRepository {
  public items: Meal[] = []

  async create(data: Meal): Promise<Meal> {
    console.log(data)
    const meal: Meal = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description,
      isAtDiet: data.isAtDiet,
      created_at: new Date(),
      userId: data.userId,
    }

    console.log(meal)

    this.items.push(meal)

    return meal
  }
}
