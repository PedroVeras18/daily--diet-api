import { expect, describe, it, beforeEach } from 'vitest'
import { makeUser } from '../../factories/user/make-user-factory'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { GetMealByIdUseCase } from './get-meal-by-id'
import { UserNotFoundError } from '../../errors/user/user-not-found-error'
import { MealNotFoundError } from '../../errors/meal/meal-not-found-error'

describe('Get Meal By Id Use Case', () => {
  let usersRepository: InMemoryUsersRepository
  let mealsRepository: InMemoryMealsRepository
  let sut: GetMealByIdUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    mealsRepository = new InMemoryMealsRepository()
    sut = new GetMealByIdUseCase(usersRepository, mealsRepository)
  })

  it('should to get meal by id', async () => {
    const userFactory = makeUser()
    const user = await usersRepository.create(userFactory)

    expect(user.id).toEqual(expect.any(String))

    const mealFreshlyCreated = await mealsRepository.create({
      id: 'meal-01',
      name: 'name-01',
      description: 'description-01',
      isAtDiet: false,
      userId: user.id,
      created_at: new Date(),
    })

    const { meal } = await sut.execute({
      userId: user.id,
      mealId: mealFreshlyCreated.id,
    })

    expect(meal).toBeDefined()
    expect(meal.name).toBe(mealFreshlyCreated.name)
  })

  it('should not be able to get meal by id when the user does not exist', async () => {
    const mealMock = {
      id: 'meal-01',
    }

    expect(() =>
      sut.execute({
        userId: 'user-01',
        mealId: mealMock.id,
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })

  it('should not be able to get meal by id when the meal does not exist', async () => {
    const userFactory = makeUser()

    const user = await usersRepository.create(userFactory)

    expect(() =>
      sut.execute({
        userId: user.id,
        mealId: 'meal-01',
      }),
    ).rejects.toBeInstanceOf(MealNotFoundError)
  })
})
