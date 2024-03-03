import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetMealById } from '@/use-cases/factories/meal/factory-meal-use-case'
import { UserNotFoundError } from '@/use-cases/errors/user/user-not-found-error'
import { getMealByIdQuerySchema } from '@/validations/meal/get-meal-by-id-schema'
import { MealNotFoundError } from '@/use-cases/errors/meal/meal-not-found-error'

export async function getMealById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user.sub
  const { mealId } = getMealByIdQuerySchema.parse(request.params)

  try {
    const getMealByIdUseCase = makeGetMealById()

    const { meal } = await getMealByIdUseCase.execute({
      mealId,
      userId,
    })

    const sanitizedMeal = { ...meal, userId: undefined }
    return reply.status(200).send(sanitizedMeal)
  } catch (error) {
    if (
      error instanceof UserNotFoundError ||
      error instanceof MealNotFoundError
    ) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
