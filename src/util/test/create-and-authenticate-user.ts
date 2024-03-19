import request from 'supertest'
import { FastifyInstance } from 'fastify'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
