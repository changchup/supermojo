import Router from 'express-promise-router'
// import * as cache from './cache'
// import * as db from './db'
// import logger from './lib/logger'
import { RequestHandler } from 'express'

const router = Router()

router.get('/health', (_, res) => res.sendStatus(200))

router.get('/hello', (_, res) => {
  res.json({ message: 'hello' })
})

router.put('/url', (async (_req, res) => {
  res.status(501).send('Not Implemented')
}) as RequestHandler)

router.get('/:slug', (async (_req, res) => {
  res.status(501).send('Not Implemented')
}) as RequestHandler)

export default router
