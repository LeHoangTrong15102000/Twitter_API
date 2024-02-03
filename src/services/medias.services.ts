// Medias Service

import { Request } from 'express'
import path from 'path'
import sharp from 'sharp'
import { UPLOAD_IMAGE_DIR } from '~/constants/dir'
import { getNameFromFullName, handleUploadImage, handleUploadVideo } from '~/utils/file'
import fs from 'fs'
import { envConfig, isProduction } from '~/constants/config'
import { Media } from '~/models/Other'
import { MediaType } from '~/constants/enums'
import databaseService from './database.services'

class MediasService {
  async uploadImage(req: Request) {
    const files = await handleUploadImage(req) // Dùng promise.all rồi map nó cho tiết kiệm thời gian
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const newName = getNameFromFullName(file.newFilename)
        const newFullFilename = `${newName}.jpg`
        const newPath = path.resolve(UPLOAD_IMAGE_DIR, newFullFilename) // Output file
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

  async uploadVideo(req: Request) {
    const files = await handleUploadVideo(req)
    const { newFilename } = files[0]

    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        return {
          url: isProduction
            ? `${envConfig.host}/static/video-stream/${file.newFilename}`
            : `http://localhost:${envConfig.port}/static/video-stream/${file.newFilename}`,
          type: MediaType.Video
        }
      })
    )
    return result
  }

  async uploadVideoHLS(req: Request) {
    // Todo
  }

  async getVideoStatus(id: string) {
    const data = await databaseService.videoStatus.findOne({ name: id })
    return data
  }
}

const mediasService = new MediasService()

export default mediasService
