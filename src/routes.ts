import Router from 'express-promise-router'
// import * as cache from './cache'
// import * as db from './db'
// import logger from './lib/logger'
import { RequestHandler } from 'express'
import slugService from './slug.service'
import { createUrl } from './db'
import logger from './lib/logger'

const router = Router()

router.get('/health', (_, res) => res.sendStatus(200))

router.get('/hello', (_, res) => {
  res.json({ message: 'hello' })
})

router.put('/url', (async (_req, res) => {
  const url = _req.body.url
  // todo need to synchronize next 2 lines
  const slug = await slugService.create()
  await createUrl(url, slug)

  logger.info(`${slug} created`)
  res.status(200).send({ slug, url })
}) as RequestHandler)

router.get('/:slug', (async (_req, res) => {
  res.status(501).send('Not Implemented')
}) as RequestHandler)

export default router
