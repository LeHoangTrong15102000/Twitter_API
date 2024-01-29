// Medias Service

import { Request } from 'express'
import path from 'path'
import sharp from 'sharp'
import { UPLOAD_DIR } from '~/constants/dir'
import { getNameFromFullName, handleUploadImage } from '~/utils/file'
import fs from 'fs'
import { envConfig, isProduction } from '~/constants/config'

class MediasService {
  async uploadImage(req: Request) {
    const file = await handleUploadImage(req)
    const newName = getNameFromFullName(file.newFilename)
    const newPath = path.resolve(UPLOAD_DIR, `${newName}.jpg`) // Output file
    console.log('Checkkk File', file)
    await sharp(file.filepath).jpeg().toFile(newPath) // process image file then export newPath
    fs.unlinkSync(file.filepath)
    return isProduction
      ? `${envConfig.host}/medias/${newName}.jpg`
      : `http://localhost:${envConfig.port}/medias/${newName}.jpg`
  }

  async uploadVideo() {
    // Todo
  }

  async uploadVideoHLS() {
    // Todo
  }

  async getVideoStatus() {
    // Todo
  }
}

const mediasService = new MediasService()

export default mediasService
