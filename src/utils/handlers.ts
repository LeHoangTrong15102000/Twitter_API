import { Request, Response, NextFunction, RequestHandler } from 'express'

// RequestHandler nó cũng nhận vào những tham số y hệt như thằng Request
export const wrapRequestHandler = <Params>(func: RequestHandler<Params, any, any, any>) => {
  // return về một request handler
  return async (req: Request<Params>, res: Response, next: NextFunction) => {
    // Promise.resolve(func(req, res, next)).catch(next)
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

// Request handler nhận vào paramsDictionary có generic type là <P> cho biến req: Request<P>, còn 2 biến res, next thì để như mặc định

// Do đó khi mà function chạy thì nó sẽ phải nhận vào 3 tham số(vì nó là requestHandler), và cái biến `req` nó phải có kiểu là Request<P>
// Khi mà khai báo GenericType thì phải khai báo ngay trước function gọi nó nữa(như là một cái để neo đậu)

// Mong muốn nhận vào là: Request<{username: string}> -> Tại vì thằng request ban đầu nó có kiểu là RequestHandler nên là {username: string} nó thấy là không nằm trong cái kiểu của paramsDictionary -> Nên là chúng ta sẽ sử dụng paramsDictionary để xử lý vấn đề này

// Thực nhận là: Request<[key: string]: string>
