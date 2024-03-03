/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchMealsByUser } from '@/use-cases/factories/factory-meal-use-case'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'
import { fetchMealsByUserQuerySchema } from '@/validations/fetch-meals-by-user-schema'

export async function fetchMealsByUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { page, userId } = fetchMealsByUserQuerySchema.parse(request.query)

  try {
    const fetchMealsByUserUseCase = makeFetchMealsByUser()

    const { meals } = await fetchMealsByUserUseCase.execute({
      page,
      userId,
    })

    const sanitizedMeals = meals.map((meal) => {
      const { userId, ...sanitizedMeal } = meal
      return sanitizedMeal
    })

    return reply.status(200).send(sanitizedMeals)
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
