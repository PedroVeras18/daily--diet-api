export interface IUser {
  id: string
  name: string
  email: string
  created_at: Date
}

export interface IEditUser {
  id?: string
  name?: string
  email?: string
  password?: string
}
