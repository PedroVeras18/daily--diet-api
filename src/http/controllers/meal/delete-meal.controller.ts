import { FastifyRequest, FastifyReply } from 'fastify'
import { makeDeleteMealUseCase } from '@/use-cases/factories/meal/factory-meal-use-case'
import { deleteMealParamSchema } from '@/validations/meal/delete-meal-schema'
import { MealNotFoundError } from '@/use-cases/errors/meal/meal-not-found-error'

export async function deleteMeal(request: FastifyRequest, reply: FastifyReply) {
  const { mealId } = deleteMealParamSchema.parse(request.params)

  try {
    const deleteMealUseCase = makeDeleteMealUseCase()

    await deleteMealUseCase.execute({
      mealId,
    })
  } catch (error) {
    if (error instanceof MealNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(200).send()
}
