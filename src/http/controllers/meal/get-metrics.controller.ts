import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetMetrics } from '@/use-cases/factories/meal/factory-meal-use-case'
import { UserNotFoundError } from '@/use-cases/errors/user/user-not-found-error'

export async function getMetrics(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.sub

  try {
    const getMetricsUseCase = makeGetMetrics()

    const metrics = await getMetricsUseCase.execute({
      userId,
    })

    return reply.status(200).send(metrics)
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
