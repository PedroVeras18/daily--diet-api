import { IEditUser, IUser } from '@/@types/user'
import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  getAll(page: number): Promise<IUser[]>
  findById(userId: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
  save(user: IEditUser): Promise<void>
  delete(userId: string): Promise<void>
}
