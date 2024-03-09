import { z } from 'zod'

export const updateMealBodySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  isAtDiet: z.boolean().optional(),
})

export const updateMealParamsSchema = z.object({
  mealId: z.string(),
})
