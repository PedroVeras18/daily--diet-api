import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Fetch All Users (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be search all users', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    for (let i = 1; i <= 22; i++) {
      await request(app.server)
        .post('/users')
        .send({
          name: `user-${i}`,
          email: `user-${i}@example.com`,
          password: `${i + 123456}`,
        })
    }

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { token } = authResponse.body

    const usersResponseFirstPage = await request(app.server)
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        page: 1,
      })

    expect(usersResponseFirstPage.statusCode).toEqual(200)
    expect(usersResponseFirstPage.body.data.length).toBe(20)
  })
})
