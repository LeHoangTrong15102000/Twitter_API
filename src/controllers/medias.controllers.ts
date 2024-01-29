// Điều hướng cho phần media Controller

import { NextFunction, Request, Response } from 'express'
import { handleUploadImage } from '~/utils/file'

export const uploadImageController = async (req: Request, res: Response, next: NextFunction) => {
  const data = await handleUploadImage(req)
  return res.json({
    result: data
  })
}

export const uploadVideoController = async (req: Request, res: Response, next: NextFunction) => {
  // Todo
}

export const uploadVideoHLSController = async (req: Request, res: Response, next: NextFunction) => {
  // Todo
}

export const videoStatusController = async (req: Request, res: Response, next: NextFunction) => {
  // Todo
}

export const serveImageController = async (req: Request, res: Response, next: NextFunction) => {
  // Todo
}

export const serveM3u8Controller = async (req: Request, res: Response, next: NextFunction) => {
  // Todo
}

export const serveSegmentController = async (req: Request, res: Response, next: NextFunction) => {
  // Todo
}

export const serveVideoStreamController = async (req: Request, res: Response, next: NextFunction) => {
  // Todo
}
