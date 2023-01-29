import { nanoid } from 'nanoid'

// turn url into a slug
class SlugsService {
  async create(): Promise<string> {
    return nanoid(parseInt(process.env.SLUG_SIZE ?? '6'))
  }
}
export default new SlugsService()
