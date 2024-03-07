import { UpdateMealUseCase } from './update-meal'
import { describe, it, beforeEach, expect } from 'vitest'
import { makeMeal } from '@/use-cases/factories/meal/make-meal-factory'
import { MealNotFoundError } from '@/use-cases/errors/meal/meal-not-found-error'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'

describe('Fetch meals by user Use Case', () => {
  let mealsRepository: InMemoryMealsRepository
  let sut: UpdateMealUseCase

  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new UpdateMealUseCase(mealsRepository)
  })

  it('should to update meal', async () => {
    const meal = makeMeal()
    await mealsRepository.create(meal)

    expect(mealsRepository.items[0].name).toBe(meal.name)

    const updatedName = 'meal-update-01'

    await sut.execute({
      anId: meal.id,
      anInput: {
        ...meal,
        name: updatedName,
      },
    })

    expect(mealsRepository.items[0].name).toBe(updatedName)
  })

  it('should not be able to update a meal who doesnt exist', async () => {
    const meal = makeMeal()

    expect(() =>
      sut.execute({
        anId: meal.id,
        anInput: meal,
      }),
    ).rejects.toBeInstanceOf(MealNotFoundError)
  })
})
