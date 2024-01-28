// Medias Service

import { Request } from 'express'
import { handleUploadImage } from '~/utils/file'

class MediasService {
  async uploadImage(req: Request) {
    const files = handleUploadImage()
  }
}

const mediasService = new MediasService()

export default mediasService
