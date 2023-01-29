import { PrismaClient } from '@prisma/client'
import { exec } from 'child_process'
import { join } from 'path'
import { URL } from 'url'
import { v4 } from 'uuid'
import { promisify } from 'util'
const execAsync = promisify(exec)

const generateDatabaseURL = (schema: string): string => {
  if (process.env.DATABASE_URL === undefined) {
    throw new Error('please provide a database url')
  }
  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.append('schema', schema)
  return url.toString()
}

const schemaId = `test-${v4()}`
const prismaBinary = join(
  __dirname,
  '..',
  '..',
  'node_modules',
  '.bin',
  'prisma'
)

const url = generateDatabaseURL(schemaId)
process.env.DATABASE_URL = url
export const prisma = new PrismaClient({
  errorFormat: 'pretty',
  datasources: { db: { url } }
})

beforeAll(async () => {
  await prisma.$executeRawUnsafe(
    'create extension if not exists citext with schema "pg_catalog";'
  )
  await execAsync(`${prismaBinary} db push --skip-generate`, {
    env: {
      ...process.env,
      DATABASE_URL: generateDatabaseURL(schemaId)
    }
  })
})
afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE;`)
  await prisma.$disconnect()
})
