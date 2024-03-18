import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../middlewares/verify-jwt'

import { register } from '../controllers/user/register.controller'
import { editUser } from '../controllers/user/edit-user.controller'
import { deleteUser } from '../controllers/user/delete-user.controller'
import { fetchAllUsers } from '../controllers/user/fetch-all-users.controller'
import { getUserProfile } from '../controllers/user/get-user-profile.controller'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.get('/users', { onRequest: [verifyJwt] }, fetchAllUsers)
  app.get('/me', { onRequest: [verifyJwt] }, getUserProfile)
  app.patch('/user', { onRequest: [verifyJwt] }, editUser)
  app.delete('/user/:userId', { onRequest: [verifyJwt] }, deleteUser)
}
