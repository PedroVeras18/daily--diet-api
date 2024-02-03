import { FastifyInstance } from 'fastify'
import { authenticate } from '../controllers/auth/authenticate'

export async function authRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticate)
}
