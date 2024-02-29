import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../middlewares/verify-jwt'

import { createMeal } from '../controllers/meal/create-meal'

export async function mealRoutes(app: FastifyInstance) {
  app.post('/meal', { onRequest: [verifyJwt] }, createMeal)
}
