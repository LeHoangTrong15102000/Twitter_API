import { Request } from 'express'
import { JsonWebTokenError } from 'jsonwebtoken'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/Errors'
import capitalize from 'lodash/capitalize'
import { envConfig } from '~/constants/config'
import { verifyToken } from './jwt'
import { TokenPayload } from '~/models/requests/User.requests'

//
export const numberEnumToArray = (numberEnum: { [key: string]: string | number }) => {
  return Object.values(numberEnum).filter((value) => typeof value === 'number') as number[]
}

// req optional vì không phải lúc nào cũng truyền dữ liệu vào req
export const verifyAccessToken = async (access_token: string, req?: Request) => {
  if (!access_token) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED,
      status: HTTP_STATUS.UNAUTHORIZED
    })
  }

  try {
    const decoded_authorization = await verifyToken({
      token: access_token,
      secretOrPublicKey: envConfig.jwtSecretAccessToken
    })
    if (req) {
      ;(req as Request).decoded_authorization = decoded_authorization
      return true
    }
    // không phải lúc nào cũng có req(chỉ có khi xử lý các middleware liên quan) nên phải return về decoded_authorization
    return decoded_authorization
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      throw new ErrorWithStatus({
        message: capitalize((error as JsonWebTokenError).message),
        status: HTTP_STATUS.UNAUTHORIZED
      })
    }
    throw error
  }
}

export const handleAuthenticationToken = async (processToken: string, req?: Request) => {
  if (!processToken) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGES.EMAIL_VERIFY_TOKEN_IS_REQUIRED,
      status: HTTP_STATUS.UNAUTHORIZED
    })
  }
  try {
    const decoded_email_verify_token = await verifyToken({
      token: processToken,
      secretOrPublicKey: envConfig.jwtSecretEmailVerifyToken
    })

    ;(req as Request).decoded_email_verify_token = decoded_email_verify_token
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      throw new ErrorWithStatus({
        message: capitalize((error as JsonWebTokenError).message),
        status: HTTP_STATUS.UNAUTHORIZED
      })
    }
    throw error
  }
}
