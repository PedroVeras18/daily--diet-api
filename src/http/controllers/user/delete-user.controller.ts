import { FastifyReply, FastifyRequest } from 'fastify'
import { deleteUserParamsSchema } from '@/validations/user/delete-user-schema'
import { makeDeleteUserUseCase } from '@/use-cases/factories/user/factory-user-use-case'
import { UserNotFoundError } from '@/use-cases/errors/user/user-not-found-error'

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const { userId } = deleteUserParamsSchema.parse(request.params)

  try {
    const deleteUser = makeDeleteUserUseCase()

    await deleteUser.execute({
      userId,
    })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
