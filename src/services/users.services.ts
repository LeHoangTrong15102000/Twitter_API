import { ObjectId } from 'mongodb'
import { envConfig } from '~/constants/config'
import { TokenType, UserVerifyStatus } from '~/constants/enum'
import { RegisterReqBody } from '~/models/requests/User.requests'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import User from '~/models/schemas/User.schema'
import databaseService from '~/services/database.services'
import { hashPassword } from '~/utils/crypto'
import { signToken, verifyToken } from '~/utils/jwt'

class UsersService {
  private signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken
      },
      privateKey: envConfig.jwtSecretAccessToken,
      options: {
        expiresIn: envConfig.accessTokenExpiresIn
      }
    })
  }

  private signRefreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken
      },
      privateKey: envConfig.jwtSecretRefreshToken,
      options: {
        expiresIn: envConfig.refreshTokenExpiresIn
      }
    })
  }

  private signEmailVerifyToken() {
    // Todo
  }

  private signForgotPasswordToken() {
    // Todo
  }

  private signAccessAndRefreshToken(user_id: string) {
    return Promise.all([this.signAccessToken(user_id), this.signRefreshToken(user_id)])
  }

  private decodeRefreshToken(refresh_token: string) {
    return verifyToken({
      token: refresh_token,
      secretOrPublicKey: envConfig.jwtSecretRefreshToken
    })
  }

  async register(payload: RegisterReqBody) {
    // const { email, password } = payload
    const result = await databaseService.users.insertOne(
      // Chỗ này khi mà chúng ta truyền vào(khởi tạo một user) thì cái kiểu dữ liệu của nó là UserType
      new User({
        ...payload,
        date_of_birth: new Date(payload.date_of_birth),
        password: hashPassword(payload.password)
      })
    )
    const user_id = result.insertedId.toString() // convert lại kiểu string
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user_id)

    const { iat, exp } = await this.decodeRefreshToken(refresh_token)
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        user_id: new ObjectId(user_id),
        token: refresh_token,
        iat,
        exp
      })
    )

    return {
      access_token,
      refresh_token
    }
  }

  async login(user_id: string) {
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user_id)

    const { iat, exp } = await this.decodeRefreshToken(refresh_token)

    // Thêm refresh_token vào trong database
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        user_id: new ObjectId(user_id),
        token: refresh_token,
        iat,
        exp
      })
    )

    return {
      access_token,
      refresh_token
    }
  }

  async refreshToken() {
    // Todo
  }

  async checkEmailExist(email: string) {
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }

  // getOauth
  private async getOauthGoogleToken() {
    // Todo
  }

  private async getGoogleUserInfo() {
    // Todo
  }

  async oauth() {
    // Todo
  }

  async logout() {
    // Todo
  }

  async verifyEmail() {
    // Todo
  }

  async resendVerifyEmail() {
    // Todo
  }

  async forgotPassword() {
    // Todo
  }

  async resetPassword() {
    // Todo
  }

  async getMe() {
    // Todo
  }

  async getProfile() {
    // Todo
  }

  async updateMe() {
    // Todo
  }

  async follow() {
    // Todo
  }

  async unfollow() {
    // Todo
  }

  async changePassword() {
    // Todo
  }

  // Em vẫn xin như ngày đầu vẫn xinh như ngày mà ta xa nhau
}

// Phải tạo ra như này thì mới lấy được cái method trong class
const usersService = new UsersService()
export default usersService
