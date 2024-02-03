import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { FetchAllUsersUseCase } from './fetch-all-users'

describe('Fetch All Users Use Case', async () => {
  let usersRepository: InMemoryUsersRepository
  let sut: FetchAllUsersUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new FetchAllUsersUseCase(usersRepository)
  })

  it('should return all users', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
    })

    const { users } = await sut.execute({
      page: 1,
    })

    expect(users).toHaveLength(1)
    expect(users[0].name).toEqual('John Doe')
  })

  it('should be able to fetch paginated users search', async () => {
    for (let i = 1; i <= 22; i++) {
      await usersRepository.create({
        id: `id-${i}`,
        name: `user-${i}`,
        email: `user${i}@example.com`,
        password: `password-user-${i}`,
      })
    }

    const { users } = await sut.execute({
      page: 2,
    })

    expect(users).toHaveLength(2)
  })
})
