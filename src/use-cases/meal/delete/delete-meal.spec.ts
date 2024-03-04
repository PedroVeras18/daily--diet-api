import { DeleteMealUseCase } from './delete-meal'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { MealNotFoundError } from '@/use-cases/errors/meal/meal-not-found-error'

describe('Delete Meal Use Case', () => {
  let mealsRepository: InMemoryMealsRepository
  let sut: DeleteMealUseCase

  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new DeleteMealUseCase(mealsRepository)
  })

  it('should to fetch meals by user', async () => {
    const mealMocked = await mealsRepository.create({
      id: 'meal-01',
      name: 'name-01',
      description: 'description-01',
      isAtDiet: false,
      userId: 'user-01',
      created_at: new Date(),
    })

    await sut.execute({
      mealId: mealMocked.id,
    })

    expect(mealsRepository.items).toEqual([])
  })

  it('should not be able to delete a meal who doesnt exist', async () => {
    const mealMock = {
      id: 'meal-01',
    }

    expect(() =>
      sut.execute({
        mealId: mealMock.id,
      }),
    ).rejects.toBeInstanceOf(MealNotFoundError)
  })
})
