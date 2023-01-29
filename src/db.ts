import { ShortUrl } from '@prisma/client'
import { prisma } from '../prisma'

// Example: Creating a new ShortUrl
export async function createUrl(url: string, slug: string): Promise<ShortUrl> {
  return await prisma.shortUrl.create({
    data: {
      url,
      slug
    }
  })
}

// Example getting a URL
export async function getUrl(slug: string): Promise<string | null> {
  const result = await prisma.shortUrl.findUnique({
    where: { slug },
    select: { url: true }
  })

  return result === null ? result : result.url
}
