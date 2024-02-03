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

    await usersRepository.create({
      name: 'Pedro Veras',
      email: 'pedroveras@example.com',
      password: await hash('123456', 6),
    })

    const { users } = await sut.execute()

    expect(users).toHaveLength(2)
    expect(users[0].name).toEqual('John Doe')
  })
})
