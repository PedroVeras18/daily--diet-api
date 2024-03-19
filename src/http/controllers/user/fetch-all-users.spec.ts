import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/util/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Fetch All Users (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be search all users', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await prisma.user.createMany({
      data: [
        {
          name: `user-01`,
          email: `user-01@example.com`,
          password: 'password-user-01',
        },
        {
          name: `user-02`,
          email: `user-02@example.com`,
          password: 'password-user-02',
        },
      ],
    })

    const fetchUsersResponse = await request(app.server)
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        page: 1,
      })

    expect(fetchUsersResponse.statusCode).toEqual(200)
    expect(fetchUsersResponse.body.data.length).toBe(3)
  })
})
