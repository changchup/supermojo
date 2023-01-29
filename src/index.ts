import { app } from './app'
import dotenv from 'dotenv'
dotenv.config()

if (require.main === module) {
  const port = process.env.PORT ?? 9000
  const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })

  const gracefulShutdown = (): void => {
    server.close(() => {
      console.log('Server exiting')
    })
  }

  process.on('SIGTERM', gracefulShutdown)
}
