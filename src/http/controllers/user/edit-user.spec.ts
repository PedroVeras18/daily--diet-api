import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/util/test/create-and-authenticate-user'

describe('Edit User (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to edit an user', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const userEdit = {
      name: 'Pedro Veras',
      email: 'pedroveras@gmail.com',
    }

    await request(app.server)
      .patch('/user')
      .set('Authorization', `Bearer ${token}`)
      .send(userEdit)

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.data.name).toEqual(userEdit.name)
  })
})
