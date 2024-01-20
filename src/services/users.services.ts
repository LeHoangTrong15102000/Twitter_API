import User from '~/models/schemas/User.schema'
import databaseService from '~/services/database.services'

class UsersService {
  async register(payload: { email: string; password: string }) {
    const { email, password } = payload
    const result = await databaseService.users.insertOne(
      // Chỗ này khi mà chúng ta truyền vào(khởi tạo một user) thì cái kiểu dữ liệu của nó là UserType
      new User({
        email,
        password
      })
    )
    return result
  }

  async refreshToken() {
    // Todo
  }

  async login() {
    // Todo
  }

  async checkEmailExist(email: string) {
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }

  async logout() {
    // Todo
  }

  async verifyEmail() {
    // Todo
  }

  // Em vẫn xin như ngày đầu vẫn xinh như ngày mà ta xa nhau
}

// Phải tạo ra như này thì mới lấy được cái method trong class
const usersService = new UsersService()
export default usersService
