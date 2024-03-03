import { FastifyReply, FastifyRequest } from 'fastify'
import { InvalidCredentialsError } from '@/use-cases/errors/auth/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/auth/factory-auth-use-case'
import { authenticateBodySchema } from '@/validations/auth/authenticate-schema'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    return reply.status(200).send({
      token,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
