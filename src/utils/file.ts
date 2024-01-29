// Xử lý các file hình ảnh và video/
import { Request, Response } from 'express'
import { File } from 'formidable'
import fs from 'fs'
import path from 'path'

export const initFolder = () => {
  const uploadFolderPath = path.resolve('uploads')
  if (!fs.existsSync(uploadFolderPath)) {
    fs.mkdirSync(uploadFolderPath, {
      recursive: true // Mục dích là để tạo folder nested
    })
  }
}

export const handleUploadImage = async (req: Request) => {
  const formidable = (await import('formidable')).default
  const form = formidable({
    uploadDir: path.resolve('uploads'),
    maxFiles: 1,
    keepExtensions: true,
    maxFileSize: 3000 * 1024, // 300KB
    filter: function ({ name, originalFilename, mimetype }) {
      const isValid = name === 'image' && Boolean(mimetype?.includes('image/'))
      if (!isValid) {
        form.emit('error' as any, new Error('File type is not valid') as any) // Tạm thời as any ở đây, đợi đội ngũ maintance của dự án hoàn hiện sẽ xử lý sau
      }
      return isValid
    }
  })
  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      // thường cái thư viện xuất ra lỗi thì cái lỗi nó lúc nào cũng là một cái object cả
      if (err) {
        // Thay vì throw err thì chúng ta sẽ reject -> Để nó thành môt Promise.reject
        return reject(err)
      }
      // Do err là null nên nó vượt qua được câu if ở trên, nên cần phải xử lý lỗi giá trị gửi lên là rỗng ở đây
      // eslint-disable-next-line no-extra-boolean-cast
      if (!Boolean(files.imagge)) {
        return reject(new Error('File is empty'))
      }
      resolve(files.image as File[])
    })
  })
}
