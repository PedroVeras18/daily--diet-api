import { Meal, Prisma } from '@prisma/client'

export interface MealsRepository {
  create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
  fetchByUser(userId: string, page: number): Promise<Meal[]>
  findById(mealId: string): Promise<Meal | null>
  delete(mealId: string): Promise<void>
  save(anInput: Meal): Promise<void>
}
