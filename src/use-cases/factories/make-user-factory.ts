import { faker } from '@faker-js/faker'
import { User } from '@prisma/client'

export function makeUser() {
  const user: User = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    created_at: new Date(),
  }

  return user
}
