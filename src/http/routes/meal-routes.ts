import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../middlewares/verify-jwt'

import { createMeal } from '../controllers/meal/create-meal'
import { fetchMealsByUser } from '../controllers/meal/fetch-meals-by-user'

export async function mealRoutes(app: FastifyInstance) {
  app.post('/meal', { onRequest: [verifyJwt] }, createMeal)
  app.get('/meals', { onRequest: [verifyJwt] }, fetchMealsByUser)
}
