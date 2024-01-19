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
}

// Phải tạo ra như này thì mới lấy được cái method trong class
const usersService = new UsersService()
export default usersService
