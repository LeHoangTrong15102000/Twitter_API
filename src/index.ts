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
import { hashPassword } from './utils/crypto'

config()

databaseService.connect().then(() => {
  databaseService.indexUsers()
  databaseService.indexRefreshTokens()
  // databaseService.indexVideoStatus()
  databaseService.indexFollowers()
  // databaseService.indexTweets()
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
io.on('connection', (socket) => {
  console.log('Check socket', socket.id)
  const user_id = socket.handshake.auth._id
  users[user_id] = {
    socket_id: socket.id
  }

  socket.on('private message', (data) => {
    const receiver_socket_id = users[data.to].socket_id // lấy được socket_id của người nhận
    // Rồi mình sẽ gửi đến người nhận đấy cái thông báo mà bên kia nhắn qua, phải emit một sự kiện mới là receive private message
    socket.to(receiver_socket_id).emit('receive private message', {
      content: data.content,
      from: user_id
    })
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
