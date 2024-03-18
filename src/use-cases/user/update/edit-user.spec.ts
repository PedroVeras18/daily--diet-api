import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { EditUserUseCase } from './edit-user'
import { IEditUser } from '@/@types/user'
import { UserNotFoundError } from '../../errors/user/user-not-found-error'

describe('Edit User Use Case', () => {
  let usersRepository: InMemoryUsersRepository
  let sut: EditUserUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new EditUserUseCase(usersRepository)
  })

  it('should be able to edit a user', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
    })

    expect(usersRepository.items[0].name).toEqual(createdUser.name)

    const editUser: IEditUser = {
      name: 'Pedro Veras',
      email: 'pedroveras@example.com',
    }

    await sut.execute({
      anId: createdUser.id,
      anInput: editUser,
    })

    expect(usersRepository.items[0].name).toEqual(editUser.name)
    expect(usersRepository.items[0].email).toEqual(editUser.email)
  })

  it('should not be able to find a user who doesnt exist', async () => {
    const userMock = {
      id: 'user-not-found-01',
    }

    expect(() =>
      sut.execute({
        anId: userMock.id,
        anInput: {},
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
