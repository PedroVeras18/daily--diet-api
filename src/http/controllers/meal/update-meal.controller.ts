import { FastifyRequest, FastifyReply } from 'fastify'
import { makeUpdateMealUseCase } from '@/use-cases/factories/meal/factory-meal-use-case'
import {
  updateMealBodySchema,
  updateMealParamsSchema,
} from '@/validations/meal/update-meal-schema'
import { MealNotFoundError } from '@/use-cases/errors/meal/meal-not-found-error'

export async function updateMeal(request: FastifyRequest, reply: FastifyReply) {
  const { mealId } = updateMealParamsSchema.parse(request.params)
  const anInput = updateMealBodySchema.parse(request.body)

  try {
    const updateMealUseCase = makeUpdateMealUseCase()

    await updateMealUseCase.execute({
      anId: mealId,
      anInput,
    })
  } catch (error) {
    if (error instanceof MealNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(200).send()
}
