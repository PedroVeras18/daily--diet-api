import { z } from 'zod'

export const createMealBodySchema = z.object({
  name: z.string(),
  userId: z.string().uuid(),
  description: z.string(),
  isAtDiet: z.boolean(),
})
