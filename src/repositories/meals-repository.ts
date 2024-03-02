import { Meal, Prisma } from '@prisma/client'

export interface MealsRepository {
  create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
  fetchByUser(userId: string, page: number): Promise<Meal[]>
}
