import { Request, Response, NextFunction } from 'express'
import { validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'
import HTTP_STATUS from '~/constants/httpStatus'
import { EntityError, ErrorWithStatus } from '~/models/Errors'
// can be reused by many routes

// sequential processing, stops running validations chain if the previous one fails.
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // validation.run(req) là để chạy những cái check(validate) dữ liệu đầu vào
    await validation.run(req)
    // Sau khi đã lấy được lỗi rồi thì sẽ đưa vào validationResult để biết thành các object lỗi
    const errors = validationResult(req)
    // Nếu mà không có lỗi thì next
    if (errors.isEmpty()) {
      return next()
    }

    const errorsObject = errors.mapped()
    console.log('Check errorsObject >>>', errorsObject)
    const entityError = new EntityError({ errors: {} }) // khởi tạo objectError cho EntityError
    for (const key in errorsObject) {
      // msg là một cái object mà nó có kiểu là ErrorWithStatus
      // Thằng typescrip nó sẽ tự hiểu là nếu msg instanceof ErrorWithStatus là true thì kiều gì nó cũng có .status
      const { msg } = errorsObject[key]
      // trả về lỗi không phải là lỗi do validate
      if (msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) {
        return next(msg) // thì next(msg) đó qua chỗ xử lý lỗi
      }
      // Còn nếu là lỗi validate thì
      entityError.errors[key] = errorsObject[key]
    }
    // console.log('Check entityError >>', entityError)

    // Nếu không thì next(entityError)
    next(entityError)

    // Chúng ta sẽ không trả về Error trong cái validation này mà chúng ta sẽ dồn cái error về app để xử lý lỗi tập trung
    // res.status(400).json({ errors: errors.mapped() })
  }
}
