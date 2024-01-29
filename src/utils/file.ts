// Xử lý các file hình ảnh và video/
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

export const handleUploadImage = () => {
  //
}
