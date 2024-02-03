import { IUser } from '@/@types/user'
import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  getAll(page: number): Promise<IUser[]>
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
