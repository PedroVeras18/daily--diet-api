import { FastifyReply, FastifyRequest } from 'fastify'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/factory-user-use-case'

export async function getUserProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getUserProfile = makeGetUserProfileUseCase()

    const { user } = await getUserProfile.execute({
      userId: request.user.sub,
    })

    return reply.status(200).send({
      data: {
        ...user,
        password: undefined,
      },
    })
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
