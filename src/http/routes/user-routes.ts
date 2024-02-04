import { FastifyInstance } from 'fastify'
import { verifyJwt } from '../middlewares/verify-jwt'
import { register } from '../controllers/user/register'
import { fetchAllUsers } from '../controllers/user/fetch-all-users'
import { getUserProfile } from '../controllers/user/get-user-profile'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.get('/users', { onRequest: [verifyJwt] }, fetchAllUsers)
  app.get('/me', { onRequest: [verifyJwt] }, getUserProfile)
}
