import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  getAll(): Promise<User[]>
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
