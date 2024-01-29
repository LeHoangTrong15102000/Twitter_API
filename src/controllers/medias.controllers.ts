// Điều hướng cho phần media Controller

import { NextFunction, Request, Response } from 'express'
import { USERS_MESSAGES } from '~/constants/messages'
import mediasService from '~/services/medias.services'

export const uploadImageController = async (req: Request, res: Response, next: NextFunction) => {
  const url = await mediasService.uploadImage(req)
  return res.json({
    message: USERS_MESSAGES.UPLOAD_SUCCESS,
    result: url
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
