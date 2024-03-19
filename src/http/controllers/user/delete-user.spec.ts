import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/util/test/create-and-authenticate-user'

describe('Delete User (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be delete an user', async () => {
    const { token } = await createAndAuthenticateUser(app)

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
