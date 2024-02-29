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
}
