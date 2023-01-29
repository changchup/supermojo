import Redis from 'ioredis'

/*
 * Redis client that can be used as a cache
 */
const redis = new Redis({
  host: process.env.REDIS_HOST ?? 'localhost',
  port: Number(process.env.REDIS_PORT ?? '63792'),
  username: process.env.REDIS_USER ?? 'default',
  password: process.env.REDIS_PASSWORD,
  enableOfflineQueue: false,
  lazyConnect: false,
  maxRetriesPerRequest: 3
})

export async function get(key: string): Promise<string | null> {
  return await redis.get(key)
}

export async function set(key: string, value: string): Promise<void> {
  await redis.set(key, value)
}
