import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { IEditUser } from '@/@types/user'

export class PrismaUsersRepository implements UsersRepository {
  async getAll(page: number) {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return users
  }

  async findById(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async save(anInput: IEditUser) {
    await prisma.user.update({
      where: {
        id: anInput.id,
      },
      data: anInput,
    })
  }

  async delete(userId: string) {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    })
  }
}
