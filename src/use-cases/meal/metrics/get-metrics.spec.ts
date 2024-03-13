import { hash } from 'bcryptjs'
import { GetMetricsUseCase } from './get-metrics'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'

describe('Get Metrics Use Case', async () => {
  let usersRepository: InMemoryUsersRepository
  let mealsRepository: InMemoryMealsRepository
  let sut: GetMetricsUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    mealsRepository = new InMemoryMealsRepository()
    sut = new GetMetricsUseCase(usersRepository, mealsRepository)
  })

  it('should return the total number of meals registered by user', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
    })

    for (let i = 1; i <= 10; i++) {
      await mealsRepository.create({
        id: `id-${i}`,
        name: `user-${i}`,
        description: `description-${i}`,
        isAtDiet: false,
        userId: createdUser.id,
        created_at: new Date(),
      })
    }

    const { totalMealsRecorded } = await sut.execute({
      userId: createdUser.id,
    })

    expect(totalMealsRecorded).toBe(10)
  })

  it('should return the total number of meals in diet registered by user', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
    })

    for (let i = 1; i <= 10; i++) {
      await mealsRepository.create({
        id: `id-${i}`,
        name: `user-${i}`,
        description: `description-${i}`,
        isAtDiet: true,
        userId: createdUser.id,
        created_at: new Date(),
      })
    }

    const { totalMealsInDiet, totalMealsOutsideDiet } = await sut.execute({
      userId: createdUser.id,
    })

    expect(totalMealsInDiet).toBe(10)
    expect(totalMealsOutsideDiet).toBe(0)
  })

  it('should return the total number of meals outside diet registered by user', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
    })

    for (let i = 1; i <= 10; i++) {
      await mealsRepository.create({
        id: `id-${i}`,
        name: `user-${i}`,
        description: `description-${i}`,
        isAtDiet: false,
        userId: createdUser.id,
        created_at: new Date(),
      })
    }

    const { totalMealsInDiet, totalMealsOutsideDiet } = await sut.execute({
      userId: createdUser.id,
    })

    expect(totalMealsInDiet).toBe(0)
    expect(totalMealsOutsideDiet).toBe(10)
  })

  it('should return the best sequence of meals within diet by user', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
    })

    for (let i = 1; i <= 10; i++) {
      await mealsRepository.create({
        id: `id-${i}`,
        name: `user-${i}`,
        description: `description-${i}`,
        isAtDiet: i > 4,
        userId: createdUser.id,
        created_at: new Date(),
      })
    }

    const { bestSequenceMealsWithinDiet } = await sut.execute({
      userId: createdUser.id,
    })

    expect(bestSequenceMealsWithinDiet).toBe(6)
  })
})
