import { ObjectId } from 'mongodb'

// interface là để kiểu tra thuộc tính đầu vào, ? thì là optional
interface RefreshTokenType {
  _id?: ObjectId
  token: string
  created_at?: Date
  user_id: ObjectId
  iat: number
  exp: number
}

export default class RefreshToken {
  // Các thuộc tính ở đây sẽ bắt buộc trên db
  _id?: ObjectId
  token: string
  created_at: Date
  user_id: ObjectId
  iat: Date
  exp: Date
  constructor({ _id, token, created_at, user_id, iat, exp }: RefreshTokenType) {
    this._id = _id
    this.token = token
    this.created_at = created_at || new Date()
    this.user_id = user_id
    // Cũng translate thằng iat và exp về kiểu Date() vì lúc tạo ra là nó là s
    this.iat = new Date(iat * 1000) // Convert Epoch time to Date
    this.exp = new Date(exp * 1000) // Convert Epoch time to Date
  }
}
