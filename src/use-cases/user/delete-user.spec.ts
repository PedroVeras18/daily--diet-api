import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { DeleteUserUseCase } from './delete-user'
import { hash } from 'bcryptjs'
import { UserNotFoundError } from '../errors/user-not-found-error'

describe('Delete User Use Case', () => {
  let usersRepository: InMemoryUsersRepository
  let sut: DeleteUserUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new DeleteUserUseCase(usersRepository)
  })

  it('should delete a user', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
    })

    await sut.execute({
      userId: createdUser.id,
    })

    expect(usersRepository.items).toEqual([])
  })

  it('should not be able to find a user who doesnt exist', async () => {
    const userMock = {
      id: 'user-not-found-01',
    }

    expect(() =>
      sut.execute({
        userId: userMock.id,
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
