import { FastifyInstance } from 'fastify'
import { authenticate } from '../controllers/auth/authenticate.controller'

export async function authRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticate)
}
