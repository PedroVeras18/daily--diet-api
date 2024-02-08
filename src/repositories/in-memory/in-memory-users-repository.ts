import { UsersRepository } from '@/repositories/users-repository'
import { User, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async getAll(page: number) {
    return this.items.slice((page - 1) * 20, page * 20)
  }

  async findById(userId: string) {
    const user = this.items.find((item) => item.id === userId)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }

  async save(user: User) {
    const itemIndex = this.items.findIndex((item) => item.id === user.id)

    this.items[itemIndex] = user
  }

  async delete(userId: string) {
    const itemIndex = this.items.findIndex((item) => item.id === userId)
    this.items.splice(itemIndex, 1)
  }
}
