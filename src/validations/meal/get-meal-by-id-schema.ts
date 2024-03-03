import { z } from 'zod'

export const getMealByIdQuerySchema = z.object({
  mealId: z.string(),
})
