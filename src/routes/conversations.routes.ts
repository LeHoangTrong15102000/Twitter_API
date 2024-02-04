import { Router } from 'express'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'

const conversationsRouter = Router()

conversationsRouter.get('/receivers/:receiver_id', accessTokenValidator, verifiedUserValidator)

export default conversationsRouter
