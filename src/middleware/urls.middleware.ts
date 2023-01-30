import express from 'express'
import { get } from '../cache'
import logger from '../lib/logger'

class UrlsMiddleware {
  async validateRequiredShortUrlBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    if (req.body?.url) {
      next()
    } else {
      res.status(400).send({
        error: 'Missing required field <URL>'
      })
    }
  }

  async sanitize(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    const regex = /[^-A-Za-z0-9+&@#/%?=~_|!:,.;\(\)]/i
    req.body.url = req.body.url.replace(regex, '')
    next()
  }

  async getSlugFromCache(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    const url = req.body?.url
    const slug = await get(url)

    if (slug != null) {
      logger.info(`got ${slug} from the cache.`)
      res.status(200).send({ slug, url })
    } else {
      next()
    }
  }

  async getUrlFromCache(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    const url = await get(req.params?.slug)

    if (url != null) {
      logger.info(`got ${url} from the cache.`)
      res.redirect(302, url)
    } else {
      next()
    }
  }

  async validateWellFormedUrl(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    const url = req.body.url
    const expression = /\b(https):\/\/[\-A-Za-z0-9+&@#\/%?=~_|!:,.;]*[\-A-Za-z0-9+&@#\/%=~_|]/gi
    const regex = new RegExp(expression)

    if (!url.match(regex)) {
      res.status(400).send({
        error: 'Url is not well formed'
      })
    } else {
      next()
    }
  }
}

export default new UrlsMiddleware()
