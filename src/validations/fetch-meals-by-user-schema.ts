import { z } from 'zod'

export const fetchMealsByUserQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  userId: z.string(),
})
