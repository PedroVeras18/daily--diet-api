import { faker } from '@faker-js/faker'
import { Meal } from '@prisma/client'

export function makeMeal(override?: Meal) {
  const meal: Meal = {
    id: override?.id ?? faker.string.uuid(),
    name: 'meal-01',
    description:
      override?.description ??
      faker.word.words({
        count: 5,
      }),
    isAtDiet: override?.isAtDiet ?? faker.datatype.boolean(),
    userId: override?.userId ?? faker.string.uuid(),
    created_at: new Date(),
  }

  return meal
}
