import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'
import { verifyJwt } from './middlewares/verify-jwt'
import { fetchAllUsers } from './controllers/fetch-all-users'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate)

  app.get('/users', { onRequest: [verifyJwt] }, fetchAllUsers)
}
