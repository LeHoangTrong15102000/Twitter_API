// Ghi các type trong dự án, khai báo thêm các kiểu cho req
import { Request } from 'express'
import User from '~/models/schemas/User.schema'
import { TokenPayload } from './models/requests/User.requests'
import Tweet from '~/models/schemas/Tweet.shema'

declare module 'express' {
  interface Request {
    user?: User
    decoded_authorization?: TokenPayload
    refresh_token_register?: string
    refresh_token_login?: string
    decoded_refresh_token?: TokenPayload
    decoded_email_verify_token?: TokenPayload
    decoded_forgot_password_token?: TokenPayload
    tweet?: Tweet
  }
}
