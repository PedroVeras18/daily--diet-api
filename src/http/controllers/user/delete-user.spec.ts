import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Delete User (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be delete an user', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { token } = authResponse.body

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    const deleteUserResponse = await request(app.server)
      .delete(`/user/${profileResponse.body.data.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        page: 1,
      })

    const usersResponse = await request(app.server)
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        page: 1,
      })

    expect(deleteUserResponse.statusCode).toEqual(200)
    expect(usersResponse.body.data).toEqual([])
  })
})
