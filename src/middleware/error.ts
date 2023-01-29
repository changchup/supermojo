import { ErrorRequestHandler } from 'express'
import logger from '../lib/logger'

const errorHandler: ErrorRequestHandler = (err: unknown, _req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  if (err instanceof Error) {
    logger.error(err)
    const status = (err as any)?.status ?? 500
    return res.status(status).json({
      message: err.message,
      error: err
    })
  }

  next(err)
}

export default errorHandler
