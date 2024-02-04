import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../middlewares/verify-jwt'

import { register } from '../controllers/user/register'
import { fetchAllUsers } from '../controllers/user/fetch-all-users'
import { getUserProfile } from '../controllers/user/get-user-profile'
import { deleteUser } from '../controllers/user/delete-user'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.get('/users', { onRequest: [verifyJwt] }, fetchAllUsers)
  app.get('/me', { onRequest: [verifyJwt] }, getUserProfile)

  app.delete('/user/:userId', { onRequest: [verifyJwt] }, deleteUser)
}
