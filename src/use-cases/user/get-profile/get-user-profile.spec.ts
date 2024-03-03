import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { UserNotFoundError } from '../../errors/user/user-not-found-error'

describe('Get User Profile Use Case', async () => {
  let usersRepository: InMemoryUsersRepository
  let sut: GetUserProfileUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user?.name).toEqual(createdUser.name)
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
