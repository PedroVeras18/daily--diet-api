import { FastifyReply, FastifyRequest } from 'fastify'
import { makeEditUserUseCase } from '@/use-cases/factories/user/factory-user-use-case'
import { UserNotFoundError } from '@/use-cases/errors/user/user-not-found-error'
import { editUserBodySchema } from '@/validations/user/edit-user-schema'

export async function editUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const anInput = editUserBodySchema.parse(request.body)

    const anId = request.user.sub

    const editUser = makeEditUserUseCase()

    await editUser.execute({
      anId,
      anInput,
    })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
