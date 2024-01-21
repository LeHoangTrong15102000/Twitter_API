import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'

// Vì những cái Type trong express-validator lúc nào cũng trả về value nên ở đây chúng ta chỉ cần lấy msg, và các giá trị còn lại có thì lấy
type ErrorType = Record<
  string,
  {
    msg: string
    [key: string]: any
  }
> // {[field: string]: { msg: string, [key: string]: any}}

// class xử lý các lỗi thông thường và kể cả lỗi 401
export class ErrorWithStatus {
  message: string
  status: number
  constructor({ message, status }: { message: string; status: number }) {
    this.message = message
    this.status = status
  }
}

// class xử lý các lỗi 422 liên quan tới việc validate
// Kế thừa từ ErrorWithStatus, vào tạo lại cái message và giá trị mặc định của nó là VALIDATION_ERROR -> Cho nó là message mặc định luôn vì là lỗi 422 nên không cần phải thay đổi nhiều
// EntityError nó luôn có status là 422 nên là chúng ta khỏi cần phải truyền status vào `constructor` làm gì
export class EntityError extends ErrorWithStatus {
  errors: ErrorType
  constructor({ message = USERS_MESSAGES.VALIDATION_ERROR, errors }: { message?: string; errors: ErrorType }) {
    // Khỏi truyền status vào constructor nên là phải truyền giá trị mặc định cho nó ở super(status: ...)
    super({ message, status: HTTP_STATUS.UNPROCESSABLE_ENTITY })
    this.errors = errors
  }
}
