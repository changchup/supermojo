import pino from 'pino'

const options =
  process.env.NODE_ENV === 'dev'
    ? { transport: { target: 'pino-pretty', options: { colorize: true } } }
    : {}
const logger = pino(options)
logger.level = process.env.LOG_LEVEL ?? 'info'
export default logger
