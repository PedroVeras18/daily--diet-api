import { z } from 'zod'

export const deleteUserParamsSchema = z.object({
  userId: z.string(),
})
