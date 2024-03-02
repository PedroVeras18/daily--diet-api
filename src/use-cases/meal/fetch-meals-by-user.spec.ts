import { expect, describe, it, beforeEach } from 'vitest'
import { makeUser } from '../factories/make-user-factory'
import { FetchAllMealsByUserUseCase } from './fetch-meals-by-user'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { UserNotFoundError } from '../errors/user-not-found-error'

describe('Fetch meals by user Use Case', () => {
  let usersRepository: InMemoryUsersRepository
  let mealsRepository: InMemoryMealsRepository
  let sut: FetchAllMealsByUserUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    mealsRepository = new InMemoryMealsRepository()
    sut = new FetchAllMealsByUserUseCase(usersRepository, mealsRepository)
  })

  it('should to fetch meals by user', async () => {
    const userFactory = makeUser()
    const user = await usersRepository.create(userFactory)

    expect(user.id).toEqual(expect.any(String))

    await mealsRepository.create({
      id: 'meal-01',
      name: 'name-01',
      description: 'description-01',
      isAtDiet: false,
      userId: user.id,
      created_at: new Date(),
    })

    const { meals } = await sut.execute({
      page: 1,
      userId: user.id,
    })

    expect(meals).toBeDefined()
    expect(meals).toHaveLength(1)
  })

  it('should not be able to fetch meals by user when the user does not exist', async () => {
    expect(() =>
      sut.execute({
        page: 1,
        userId: 'user-01',
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })

  it('should be able to fetch paginated meals search', async () => {
    const userFactory = makeUser()
    const user = await usersRepository.create(userFactory)

    for (let i = 1; i <= 22; i++) {
      await mealsRepository.create({
        id: `meal-${i}`,
        name: `name-${i}`,
        description: `description-${i}`,
        isAtDiet: false,
        userId: user.id,
        created_at: new Date(),
      })
    }

    const { meals } = await sut.execute({
      page: 2,
      userId: user.id,
    })

    expect(meals).toHaveLength(2)
  })
})
