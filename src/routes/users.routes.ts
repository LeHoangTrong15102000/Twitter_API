import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'
const usersRouter = Router()

// Khi mà luồng code chạy thì nó sẽ chạy qua các handler này trước

// Params đầu tiên sẽ là cái path, params thứ 2 -> 9 là cái handler(được gọi là Request Handler) này đóng vai trò như là một middleware vậy
/**
 * Description. Login a user
 * Path: /login
 * Method: POST
 * Body: { email: string, password: string }
 */
usersRouter.post('/login', loginValidator, loginController)
/**
 * Description. Register a new user
 * Path: /register
 * Method: POST
 * Body: { name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601 }
 */
usersRouter.post('/register', registerValidator, registerController)

export default usersRouter
