// Medias Service

import { Request } from 'express'
import path from 'path'
import sharp from 'sharp'
import { UPLOAD_DIR } from '~/constants/dir'
import { getNameFromFullName, handleUploadImage } from '~/utils/file'
import fs from 'fs'
import { envConfig, isProduction } from '~/constants/config'
import { Media } from '~/models/Other'
import { MediaType } from '~/constants/enums'

class MediasService {
  async uploadImage(req: Request) {
    const files = await handleUploadImage(req) // Dùng promise.all rồi map nó cho tiết kiệm thời gian
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const newName = getNameFromFullName(file.newFilename)
        const newFullFilename = `${newName}.jpg`
        const newPath = path.resolve(UPLOAD_DIR, newFullFilename) // Output file
        await sharp(file.filepath).jpeg().toFile(newPath) // process image file then export newPath
        fs.unlinkSync(file.filepath)
        // Đường đãn trả về phải image/ thì mới hợp lệ
        return {
          url: isProduction
            ? `${envConfig.host}/static/image/${newName}.jpg`
            : `http://localhost:${envConfig.port}/static/image/${newName}.jpg`,
          type: MediaType.Image
        }
      })
    )
    return result
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
