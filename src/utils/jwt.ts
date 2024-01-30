import jwt, { SignOptions } from 'jsonwebtoken'
import { TokenPayload } from '~/models/requests/User.requests'

// Với những tham số nhiều như này thì ưu tiên dùng Object hơn
export const signToken = ({
  payload,
  privateKey,
  options = { algorithm: 'HS256' } // Mặc định thuật toán chúng ta sử dụng là HS256
}: {
  payload: string | Buffer | object
  privateKey: string
  options?: SignOptions
}) => {
  // Biến callback trong hàm sign() thành một promise
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (error, token) => {
      // Nếu có lỗi thì nó sẽ chạy trên đây chứ không vào resolve được
      if (error) {
        throw reject(error)
      }
      resolve(token as string) // Mỗi khi nó không có lỗi thì cái token thì luôn phải là string
    })
  })
}

// Khi mà đưa token vào thì server nó sẽ kiểm tra có đúng secretOrPublicKey hay không -> Nếu đúng thì trả về decoded_verify_token
export const verifyToken = ({ token, secretOrPublicKey }: { token: string; secretOrPublicKey: string }) => {
  return new Promise<TokenPayload>((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, (error, decoded) => {
      if (error) {
        throw reject(error) // Nếu mà có lỗi thì throw reject cho nó ngưng luôn tại chỗ này
      }
      resolve(decoded as TokenPayload)
    })
  })
}
