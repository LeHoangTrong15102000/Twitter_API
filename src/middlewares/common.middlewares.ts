//
import { NextFunction, Request, Response } from 'express'
import pick from 'lodash/pick'

type FilterKeys<Type> = Array<keyof Type> // đảm bảo rằng các key trong array đèu thuộc kiểu Type

// Nó vẫn đảm bảo return về cho chúng ta một cái handler, chúng ta có thể làm cho thằng filterMiddleware gợi ý khi sử dụng bằng cách sử dụng generic type
export const filterMiddleware =
  <Type>(filterKeys: FilterKeys<Type>) =>
  (req: Request, res: Response, next: NextFunction) => {
    // Khi mà người dùng gửi lên thì nó chỉ lấy những cái key được cho phép
    req.body = pick(req.body, filterKeys)
    next()
  }
