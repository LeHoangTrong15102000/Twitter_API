import express, { NextFunction, Request, Response } from 'express'
import exitHook from 'async-exit-hook'

import usersRouter from '~/routes/users.routes'
import databaseService from '~/services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.routes'
import { config } from 'dotenv'
import { initFolder } from './utils/file'
import cors, { CorsOptions } from 'cors'
import path from 'path'
import staticRouter from './routes/static.routes'
import { MongoClient, ObjectId } from 'mongodb'
import { UPLOAD_VIDEO_DIR } from './constants/dir'
import tweetsRouter from './routes/tweets.routes'
import bookmarksRouter from './routes/bookmarks.routes'
import likesRouter from './routes/likes.routes'
import searchRouter from './routes/search.routes'
import conversationsRouter from './routes/conversations.routes'
import { envConfig, isProduction } from './constants/config'

import { createServer } from 'http'
import { Server } from 'socket.io'
import Conversation from './models/schemas/Conversations.schema'
import { verifyAccessToken } from './utils/commons'
import { TokenPayload } from './models/requests/User.requests'
import { UserVerifyStatus } from './constants/enums'
import { ErrorWithStatus } from './models/Errors'
import { USERS_MESSAGES } from './constants/messages'
import HTTP_STATUS from './constants/httpStatus'

config()

databaseService.connect().then(() => {
  databaseService.indexUsers()
  databaseService.indexRefreshTokens()
  // databaseService.indexVideoStatus()
  databaseService.indexFollowers()
  // databaseService.indexTweets()
  databaseService.indexConversations()
})

const app = express()
const httpServer = createServer(app)

const corsOptions: CorsOptions = {
  origin: isProduction ? envConfig.clientUrl : '*'
}
app.use(cors(corsOptions))
const port = envConfig.port

// Tạo folder Upload
initFolder()

app.use(express.json()) // Nó sẽ biến JSON thành một cái object cho chúng ta
app.use('/users', usersRouter)
app.use('/medias', mediasRouter)
app.use('/tweets', tweetsRouter)
app.use('/bookmarks', bookmarksRouter)
app.use('/likes', likesRouter)
app.use('/search', searchRouter)
app.use('/conversations', conversationsRouter)
app.use('/static', staticRouter)
app.use('/static/video', express.static(UPLOAD_VIDEO_DIR))

// app.use('/static', express.static(UPLOAD_DIR)) // sẽ tự động handle và xuất ra cho chúng ta cái file

app.use(defaultErrorHandler)

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

const users: {
  [key: string]: {
    socket_id: string
  }
} = {}

io.use(async (socket, next) => {
  // Middlewares
  const Authorization = socket.handshake.auth.Authorization
  const access_token = Authorization?.split(' ')[1]
  try {
    const decoded_authorization = await verifyAccessToken(access_token)
    const { verify } = decoded_authorization as TokenPayload
    if (verify !== UserVerifyStatus.Verified) {
      // next(err) trong cái function bth
      throw new ErrorWithStatus({
        message: USERS_MESSAGES.USER_NOT_VERIFIED,
        status: HTTP_STATUS.FORBIDDEN
      })
    }
    // Truyền decoded_authorization vào socket để sử dụng ở các middleware khác(mutate cái auth trong handshake)
    socket.handshake.auth.decoded_authorization = decoded_authorization
    next()
    // Khi mà  mình  throw cái lỗi thì nó sẽ nhảy tới thằng catch() thì thằng catch() sẽ next(err) đó cho mình
  } catch (error) {
    console.log(error)
    // Do nó kế thừa từ Object Error mặc định
    next({
      message: 'Unauthorized',
      name: 'UnauthorizedError',
      data: error
    })
  }
})
io.on('connection', (socket) => {
  console.log('Check socket', socket.id)
  const { user_id } = socket.handshake.auth.decoded_authorization as TokenPayload
  users[user_id] = {
    socket_id: socket.id
  }

  socket.on('send_message', async (data) => {
    const { receiver_id, sender_id, content } = data.payload
    // Khi client-2 kết nối thì cái callback(socket) nó cũng sẽ tạo ra một socket_id-2
    const receiver_socket_id = users[receiver_id]?.socket_id // lấy được socket_id của người nhận
    // if (!receiver_socket_id) return

    const conversation = new Conversation({
      sender_id: new ObjectId(sender_id),
      receiver_id: new ObjectId(receiver_id),
      content
    })
    // Thực hiện insertOne xon thì emit sự kiện để bên kia nhận được
    const result = await databaseService.conversations.insertOne(conversation)
    // gán _id cho cái conversation
    conversation._id = result.insertedId
    // Rồi mình sẽ gửi đến người nhận đấy cái thông báo mà bên kia nhắn qua, phải emit một sự kiện mới là receive private message
    if (receiver_socket_id) {
      // nếu mà có receiver_socket_id thì mới gửi tin qua
      socket.to(receiver_socket_id).emit('receive_message', {
        payload: conversation
      })
    }
  })
  socket.on('disconnect', () => {
    delete users[user_id]
    console.log(`Socket ${socket.id} disconnected`)
  })
})

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

exitHook(() => {
  databaseService.disconnect()
})
