import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../middlewares/verify-jwt'

import { createMeal } from '../controllers/meal/create-meal'
import { fetchMealsByUser } from '../controllers/meal/fetch-meals-by-user'
import { getMealById } from '../controllers/meal/get-meal-by-id'
import { deleteMeal } from '../controllers/meal/delete-meal'
import { updateMeal } from '../controllers/meal/update-meal'
import { getMetrics } from '../controllers/meal/get-metrics'

export async function mealRoutes(app: FastifyInstance) {
  app.post('/meal', { onRequest: [verifyJwt] }, createMeal)

  app.get('/meals', { onRequest: [verifyJwt] }, fetchMealsByUser)
  app.get('/meal/:mealId', { onRequest: [verifyJwt] }, getMealById)

  app.get('/meals/metrics', { onRequest: [verifyJwt] }, getMetrics)

  app.patch('/meal/:mealId', { onRequest: [verifyJwt] }, updateMeal)

  app.delete('/meal/:mealId', { onRequest: [verifyJwt] }, deleteMeal)
}
