// Điều hướng cho phần media Controller

import { NextFunction, Request, Response } from 'express'
import path from 'path'
console.log(path.resolve('uploads'))
export const uploadImageController = async (req: Request, res: Response, next: NextFunction) => {
  const formidable = (await import('formidable')).default
  const form = formidable({
    uploadDir: path.resolve('uploads'),
    maxFiles: 1,
    keepExtensions: true,
    maxFileSize: 300 * 1024 // 300KB
  })
  form.parse(req, (err, files, file) => {
    // thường cái thư viện xuất ra lỗi thì cái lỗi nó lúc nào cũng là một cái object cả
    if (err) {
      throw err
    }
    res.json({
      message: 'Upload image successfully'
    })
  })
  // return res.json({
  //   message: 'Uploading image success'
  // })
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
