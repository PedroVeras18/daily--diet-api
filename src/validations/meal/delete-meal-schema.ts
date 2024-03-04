import { z } from 'zod'

export const deleteMealParamSchema = z.object({
  mealId: z.string().uuid(),
})
