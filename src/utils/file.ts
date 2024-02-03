// Xử lý các file hình ảnh và video/
import { Request, Response } from 'express'
import { File } from 'formidable'
import fs from 'fs'
import path from 'path'
import { UPLOAD_IMAGE_TEMP_DIR, UPLOAD_VIDEO_DIR, UPLOAD_VIDEO_TEMP_DIR } from '~/constants/dir'

export const initFolder = () => {
  ;[UPLOAD_IMAGE_TEMP_DIR, UPLOAD_VIDEO_TEMP_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true // Mục dích là để tạo folder nested
      })
    }
  })
}

export const handleUploadImage = async (req: Request) => {
  const formidable = (await import('formidable')).default
  const form = formidable({
    uploadDir: UPLOAD_IMAGE_TEMP_DIR,
    maxFiles: 4,
    keepExtensions: true, // lấy luôn cả đuôi mở rộng của file
    maxFileSize: 300 * 1024, // 300KB
    maxTotalFileSize: 300 * 1024 * 4, // 1200KB
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
      if (!Boolean(files.image)) {
        return reject(new Error('File is empty'))
      }
      resolve(files.image as File[])
    })
  })
}

// Cách xử lý khi upload video và encode
// Có 2 giai đoạn
// Upload video: Upload video thành công thì resolve về cho người dùng
// Encode video: Khai báo thêm 1 url endpoint để check xem cái video đó đã encode xong chưa

export const handleUploadVideo = async (req: Request) => {
  const formidable = (await import('formidable')).default
  // Cách để có được định dạng idname/idname.mp4
  // ✅Cách 1: Tạo unique id cho video ngay từ đầu
  // ❌Cách 2: Đợi video upload xong rồi tạo folder, move video vào

  // const nanoId = (await import('nanoid')).nanoid
  // const idName = nanoId()
  // const folderPath = path.resolve(UPLOAD_VIDEO_DIR, idName)
  // fs.mkdirSync(folderPath)
  const form = formidable({
    uploadDir: UPLOAD_VIDEO_DIR,
    maxFiles: 1,
    maxFileSize: 50 * 1024 * 1024, // 50MB
    filter: function ({ name, originalFilename, mimetype }) {
      const valid = name === 'video' && Boolean(mimetype?.includes('mp4') || mimetype?.includes('quicktime'))
      if (!valid) {
        form.emit('error' as any, new Error('File  type is not valid') as any)
      }
      return valid
    }
  })
  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      // eslint-disable-next-line no-extra-boolean-cast
      if (!Boolean(files.video)) {
        return reject(new Error('File is empty'))
      }
      // Lấy array video ra để xử lý đuôi mở rộng cho nó
      const videos = files.video as File[]
      videos.forEach((video) => {
        // Lấy cái ra cái ext từ cái tên ban đầu của vide-upload
        const ext = getExtension(video.originalFilename as string)
        // sửa tên (đường dẫn cũ , dường dẫn mới)
        fs.renameSync(video.filepath, video.filepath + '.' + ext)
        video.newFilename = video.newFilename + '.' + ext
        video.filepath = video.filepath + '.' + ext
      })
      resolve(files.video as File[])
    })
  })
}

export const getNameFromFullName = (fullname: string) => {
  const nameArr = fullname.split('.')
  nameArr.pop()
  return nameArr.join('')
}

export const getExtension = (fullname: string) => {
  const nameArr = fullname.split('.')
  return nameArr[nameArr.length - 1]
}

export const getFiles = (dir: string, files: string[] = []) => {
  // Get an array of all files and directories in the passed directory using fs.readdirSync
  const fileList = fs.readdirSync(dir)
  // Create the full path of the file/directory by concatenating the passed directory and file/directory name
  for (const file of fileList) {
    const name = `${dir}/${file}`
    // Check if the current file/directory is a directory using fs.statSync
    if (fs.statSync(name).isDirectory()) {
      // If it is a directory, recursively call the getFiles function with the directory path and the files array
      getFiles(name, files)
    } else {
      // If it is a file, push the full path to the files array
      files.push(name)
    }
  }
  return files
}
