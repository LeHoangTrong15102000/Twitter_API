import { Request } from 'express'

//
export const numberEnumToArray = (numberEnum: { [key: string]: string | number }) => {
  return Object.values(numberEnum).filter((value) => typeof value === 'number') as number[]
}

// req optional vì không phải lúc nào cũng truyền dữ liệu vào req
export const verifyAccessToken = async (access_token: string, req?: Request) => {
  // Todo
}
