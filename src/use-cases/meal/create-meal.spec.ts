import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { CreateMealUseCase } from './create-meal'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { UserNotFoundError } from '../errors/user-not-found-error'

describe('Create Meal Use Case', () => {
  let usersRepository: InMemoryUsersRepository
  let mealsRepository: InMemoryMealsRepository
  let sut: CreateMealUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    mealsRepository = new InMemoryMealsRepository()
    sut = new CreateMealUseCase(usersRepository, mealsRepository)
  })

  it('should to create a meal', async () => {
    const user = await usersRepository.create({
      id: `id-01`,
      name: `user-01`,
      email: `user01@example.com`,
      password: `password-user-01`,
    })

    expect(user.id).toEqual(expect.any(String))

    const { meal } = await sut.execute({
      name: 'meal-01',
      description: 'description-01',
      isAtDiet: false,
      userId: user.id,
    })

    expect(meal.id).toEqual(expect.any(String))
  })

  it('should not be able to create a meal when the user does not exist', async () => {
    expect(() =>
      sut.execute({
        name: 'user-01',
        description: 'description-01',
        isAtDiet: false,
        userId: 'user-01',
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
