import { makeFetchAllUsersUseCase } from '@/use-cases/factories/make-fetch-all-users-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetchAllUsers(_: FastifyRequest, reply: FastifyReply) {
  const fetchAllUsers = makeFetchAllUsersUseCase()

  const { users } = await fetchAllUsers.execute()

  return reply.status(200).send({
    data: users,
  })
}
