import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { CreateMealUseCase } from './create-meal'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { UserNotFoundError } from '../../errors/user/user-not-found-error'
import { makeUser } from '../../factories/user/make-user-factory'
import { faker } from '@faker-js/faker'

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
    const userFactory = makeUser()
    const user = await usersRepository.create(userFactory)

    expect(user.id).toEqual(expect.any(String))

    const { meal } = await sut.execute({
      name: 'Rodízio de comida japonesa',
      description: faker.lorem.words({ min: 3, max: 5 }),
      isAtDiet: faker.datatype.boolean(),
      userId: user.id,
    })

    expect(meal.id).toEqual(expect.any(String))
  })

  it('should not be able to create a meal when the user does not exist', async () => {
    expect(() =>
      sut.execute({
        name: 'Rodízio de comida japonesa',
        description: faker.lorem.words({ min: 3, max: 5 }),
        isAtDiet: faker.datatype.boolean(),
        userId: 'user-01',
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
