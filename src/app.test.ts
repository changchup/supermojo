import request from 'supertest'
import { app } from './app'
import { CreateShortUrlResponse } from './types'
import * as db from './db'

describe('health check', () => {
  describe('/health', () => {
    it('responds with 200', async () => {
      const res = await request(app).get('/health')
      expect(res.statusCode).toBe(200)
    })
  })
})

describe('creating a short url -- basic', () => {
  const url = 'https://www.google.com'

  it('PUT /url', async () => {
    const res = await request(app).put('/url').send({ url })
    expect(res.statusCode).toBe(200)
    const slug = res.body.slug
    expect(res.body).toMatchObject<CreateShortUrlResponse>({ url, slug })
  })

  it('GET /:slug', async () => {
    const slug = '12345'
    await db.createUrl(url, slug)

    const res = await request(app).get(`/${slug}`)

    expect(res.statusCode).toEqual(302)
    expect(res.headers.location).toEqual(url)
  })
})
