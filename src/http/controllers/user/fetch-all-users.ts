import { makeFetchAllUsersUseCase } from '@/use-cases/factories/factory-user-use-case'
import { getAllUsersQuerySchema } from '@/validations/get-all-users-schema'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetchAllUsers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { page } = getAllUsersQuerySchema.parse(request.query)

  const fetchAllUsers = makeFetchAllUsersUseCase()

  const { users } = await fetchAllUsers.execute({
    page,
  })

  return reply.status(200).send({
    data: users,
  })
}
