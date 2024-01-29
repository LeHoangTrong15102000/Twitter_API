import { Router } from 'express'
import { serveImageController } from '~/controllers/medias.controllers'

// Todo
const staticRouter = Router()

// Cách này giúp chúng ta custom sâu hơn
staticRouter.get('/image/:name', serveImageController)
staticRouter.get('/video-stream/:name')
staticRouter.get('/video-hls/:id/master.m3u8')
staticRouter.get('/video-hls/:id/:v/:segment')

export default staticRouter
