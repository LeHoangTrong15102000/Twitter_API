import express, { NextFunction, Request, Response } from 'express'
import exitHook from 'async-exit-hook'

import usersRouter from '~/routes/users.routes'
import databaseService from '~/services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.routes'
import { config } from 'dotenv'
import { initFolder } from './utils/file'

config()

databaseService.connect()

const app = express()
const port = process.env.PORT || 8000

// Tạo folder Upload
initFolder()

app.use(express.json()) // Nó sẽ biến JSON thành một cái object cho chúng ta
app.use('/users', usersRouter)
app.use('/medias', mediasRouter)

app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

exitHook(() => {
  databaseService.disconnect()
})
