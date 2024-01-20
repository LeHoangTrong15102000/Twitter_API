// Hash password của người dùng gửi lên rồi mới lưu vào database

import { createHash } from 'crypto'
import { config } from 'dotenv'

config()

export function sha256(content: string) {
  return createHash('sha256').update(content).digest('hex')
}

// Cộng thêm kí tự đặc biệt vào password để tăng độ bảo mật
export function hashPassword(password: string) {
  return sha256(password + process.env.PASSWORD_SECRET)
}
