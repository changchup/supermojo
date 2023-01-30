import Router from 'express-promise-router'
// import * as cache from './cache'
// import * as db from './db'
// import logger from './lib/logger'
import { RequestHandler } from 'express'
import slugService from './slug.service'
import { createUrl, getUrl } from './db'
import logger from './lib/logger'
import { set } from './cache'
import UrlsMiddleware from './middleware/urls.middleware'

const router = Router()

router.get('/health', (_, res) => res.sendStatus(200))

router.get('/hello', (_, res) => {
  res.json({ message: 'hello' })
})

const putMiddleWare = [
  UrlsMiddleware.getSlugFromCache,
  UrlsMiddleware.validateRequiredShortUrlBodyFields,
  UrlsMiddleware.validateWellFormedUrl,
  UrlsMiddleware.sanitize
]

router.put('/url', putMiddleWare, (async (_req, res) => {
  const url = _req.body.url
  // todo need to synchronize next 2 lines
  const slug = await slugService.create()
  await createUrl(url, slug)

  if (slug) {
    // set cache
    await set(url, slug)
    logger.info(`${slug} created`)
    res.status(200).send({ slug, url })
  } else {
    logger.error('No slug created')
    res.status(400).send({ slug, url })
  }
}) as RequestHandler)

const getMiddleWare = [
  UrlsMiddleware.getUrlFromCache
]

router.get('/:slug', getMiddleWare, (async (_req, res) => {
  const slug = _req.params.slug
  const url = await getUrl(slug)
  if (url) {
    // set cache
    await set(slug, url)

    logger.info(`Redirecting to ${url}`)
    res.redirect(302, url)
  } else {
    logger.info(`No url found for ${slug}`)
    res.status(401).json(`No url found for ${slug}`)
  }
}) as RequestHandler)

export default router
