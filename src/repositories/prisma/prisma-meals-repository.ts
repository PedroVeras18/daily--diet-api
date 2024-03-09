import { Prisma } from '@prisma/client'
import { MealsRepository } from '../meals-repository'
import { prisma } from '@/lib/prisma'

export class PrismaMealsRepository implements MealsRepository {
  async create(data: Prisma.MealUncheckedCreateInput) {
    const meal = await prisma.meal.create({
      data,
    })

    return meal
  }

  async fetchByUser(userId: string, page: number) {
    const meals = await prisma.meal.findMany({
      where: {
        userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return meals
  }

  async findById(mealId: string) {
    const meal = await prisma.meal.findUnique({
      where: {
        id: mealId,
      },
    })

    return meal
  }

  async save(anInput: Prisma.MealUncheckedUpdateInput): Promise<void> {
    await prisma.meal.update({
      where: {
        id: anInput.id?.toString(),
      },
      data: anInput,
    })
  }

  async delete(mealId: string) {
    await prisma.meal.delete({
      where: {
        id: mealId,
      },
    })
  }
}
