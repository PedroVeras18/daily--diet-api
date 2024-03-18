import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../middlewares/verify-jwt'

import { createMeal } from '../controllers/meal/create-meal.controller'
import { fetchMealsByUser } from '../controllers/meal/fetch-meals-by-user.controller'
import { getMealById } from '../controllers/meal/get-meal-by-id.controller'
import { deleteMeal } from '../controllers/meal/delete-meal.controller'
import { updateMeal } from '../controllers/meal/update-meal.controller'
import { getMetrics } from '../controllers/meal/get-metrics.controller'

export async function mealRoutes(app: FastifyInstance) {
  app.post('/meal', { onRequest: [verifyJwt] }, createMeal)

  app.get('/meals', { onRequest: [verifyJwt] }, fetchMealsByUser)
  app.get('/meal/:mealId', { onRequest: [verifyJwt] }, getMealById)

  app.get('/meals/metrics', { onRequest: [verifyJwt] }, getMetrics)

  app.patch('/meal/:mealId', { onRequest: [verifyJwt] }, updateMeal)

  app.delete('/meal/:mealId', { onRequest: [verifyJwt] }, deleteMeal)
}
