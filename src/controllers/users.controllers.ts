import { NextFunction, Request, Response } from 'express'
import {
  LoginReqBody,
  LogoutReqBody,
  RefreshTokenReqBody,
  RegisterReqBody,
  TokenPayload
} from '~/models/requests/User.requests'
import { ParamsDictionary } from 'express-serve-static-core'
import User from '~/models/schemas/User.schema'
import databaseService from '~/services/database.services'
import usersService from '~/services/users.services'
import { ObjectId } from 'mongodb'
import { USERS_MESSAGES } from '~/constants/messages'

export const loginController = async (
  req: Request<ParamsDictionary, any, LoginReqBody>,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as User
  const user_id = user._id as ObjectId
  const result = await usersService.login(user_id.toString())

  return res.json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result
  })
}

export const oauthController = async (req: Request, res: Response, next: NextFunction) => {
  // Todo
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await usersService.register(req.body)
  return res.json({
    message: USERS_MESSAGES.REGISTER_SUCCESS,
    result
  })
}

export const logoutController = async (req: Request<ParamsDictionary, any, any, LogoutReqBody>, res: Response) => {
  const { refresh_token } = req.body
  const result = await usersService.logout(refresh_token)
  return res.json(result)
}

export const refreshTokenController = async (
  req: Request<ParamsDictionary, any, any, RefreshTokenReqBody>,
  res: Response
) => {
  const { refresh_token } = req.body
  const { user_id, verify, exp } = req.decoded_refresh_token as TokenPayload
  const result = await usersService.refreshToken({ user_id, verify, refresh_token, exp })

  return res.json({
    message: USERS_MESSAGES.REFRESH_TOKEN_SUCCESS,
    result
  })
}

export const verifyEmailController = async () => {
  // Todo
}

export const resendVerifyEmailController = async () => {
  // Todo
}

export const forgotPasswordController = async () => {
  // Todo
}

export const verifyForgotPasswordController = async () => {
  // Todo
}

export const resetPasswordController = async () => {
  // Todo
}

export const getMeController = async () => {
  // Todo
}

export const getProfileController = async () => {
  // Todo
}

export const updateMeController = async () => {
  // Todo
}

export const followController = async () => {
  // Todo
}

export const unfollowController = async () => {
  // Todo
}

export const changePasswordController = async () => {
  // Todo
}
