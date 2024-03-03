import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreateMealUseCase } from '@/use-cases/factories/meal/factory-meal-use-case'
import { createMealBodySchema } from '@/validations/create-meal-schema'
import { UserNotFoundError } from '@/use-cases/errors/user/user-not-found-error'

export async function createMeal(request: FastifyRequest, reply: FastifyReply) {
  const { name, userId, isAtDiet, description } = createMealBodySchema.parse(
    request.body,
  )

  try {
    const createMealUseCase = makeCreateMealUseCase()

    await createMealUseCase.execute({
      name,
      userId,
      description,
      isAtDiet,
    })
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
