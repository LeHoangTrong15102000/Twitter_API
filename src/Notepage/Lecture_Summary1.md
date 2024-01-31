# Học NodeJS Super qua dự án - Twitter API

## Kỹ thuật dùng Postman

- Thực hiện setup cho postman nó được tiến hành tự động

## Chức năng User

### Verify Email

- Thực hiện `verify Email` cho người dùng cũng là tính năng khá là hay nên là cần phải tập trung hơn nữa

- Sau khi mà người dùng đăng kí tài khoản thì chúng ta sẽ gửi cái email đến email người dùng -> Nội dung bên trong sẽ là `hãy click vào link sau để xác thực mail` -> Khi mà người dùng click vào cái link đấy thì chúng ta sẽ change cái `status` trong cái `database` từ `Unverified` thành `Verified` -> Xong rồi trả lại `access_token` và `refresh_token` đã được `verifed`

  - Khi mà người dùng chưa `verify` chi có thể đăng nhập thôi không làm được điều gì trong đó cả, đợi khi nào `Verified` rồi thì chúng ta mới cho phép người dùng thao tác trên ứng dụng

- Ở phía client sẽ được setting 1 cái đường link như thế này `duthanhduoc.com/verify-email?email_verify_token=1231332131` -> Thì khi mà người dùng click vào cái đường link như thế này thì thằng client `Vue hay React` gì đấy sẽ nhận được 1 cái `email_verify_token` -> Client sẽ thực hiện 1 cái method `POST` với cái URL là API của mình `api-duthanhduoc.com/verify-email` với `body` là `email-verify-token` -> Sau đó `server` sẽ tiến hành xác thực xem `user` này là ai sau đó sẽ thay đổi `verify` cho người đó

  - Ở đây cái luồng của chúng ta là khi mà người dùng click vào cái đường link xong rồi thì đăng nhập luôn -> Lúc này trả về `access_token` và `refresh_token` đã xác thực cho người dùng luôn'

- Cần `validate` `email_verify_token` xem nó có đúng định dạng hay không

- Việc kiểm tra `email_verify_token` có tồn tại hay không thì nên kiểm tra ở `usersController` thì nó sẽ hợp lí hơn

- Khi mà người dùng đã xác thực rồi mà nhấn vào nút xác thực email thì chúng ta vẫn gọi đến `routes` là `/users/verify-email` thì lúc này server sẽ kiểm tra rồi trả về

- Tại sao lại find t heo ID chứ không find theo `email_verify_token` thì cái này liên quan đến cái `index` của `MongoDB` -> Cái ID nó được index thì chúng ta find nó sẽ nhanh hơn

> Xóa refresh_token chưa được xác thực khỏi database

### Mẹo cập nhật thời gian với $currentDate và $$NOW

- Tạo giá trị cập nhật(new Date), MongoDB cập nhật giá trị(sau thời điểm tạo giá trị cập nhật) -> Thì cái thời điểm currentDate sau thời điểm cập nhật giá trị vài trăm ms

- thằng $set { updated_at: new Date} -> là do chúng ta đưa cái Date vào, còn $currentDate: { updated_at } là do MongoDB đưa cái Date vào

- Còn có 1 cái options khác khi mà chúng ta không muốn dùng currentDate đó là

### Resend verify email

- Chỉ cần gửi lại cho người ta một cái email với email-verify-token mới là được

- Yêu cầu phải đăng nhập rồi mới được resend email

- Rồi phải xem người dùng đã `verifyEmail` chưa -> Nếu đã `verifyEmail` rồi mà cứ nhấn liên tục thì không được

### Forgot password

- Sau khi người dùng nhấn vào forgotPassword -> Thì sẽ cho người dùng nhập email rồi sau đó người dùng sẽ click vào đường dẫn thì sẽ đưa người dùng đến trang `reset-password` -> Người dùng tiến hành reset password

### Verify forgot password token

### Reset password

### Get me

- Người dùng chưa verify email thì chúng ta vẫn cho get Profile -> Lấy get Profile chỉ cần truyền access_token lên -> Sau khi đăng kí xong thì cho user vào trang Home luôn -> Xong rồi quăng cái thông báo `hãy kiểm tra email để xác thực email của bạn` song song đó vẫn cho người dùng gọi API `get profile` -> Sau khi xác thực xong thì thông báo cho người dùng là `xác thực email thành công`

- Chỉ cần access_token của người dùng truyền lên để minh biết là người dùng này là ai thôi -> Còn lại không cần verify email

### MongoDB Schema Validation

- Đã thực hiện đưa `User` và `RefreshToken` vào database rồi mà chưa có validation tầng database -> Nên là chúng ta sẽ validation tầng database

- Và chúng ta cũng đã tạo một cái object cho nó đúng cái định dạng trước khi chúng ta đưa vào database -> Nhưng điều này vẫn chưa đảm bảo được nếu mà chúng ta khai báo thừa hoặc thiếu data ở Schema của mỗi Collection -> Rất là dễ xảy ra cái tình trạng mà chúng ta chèn thừa hoặc là chèn sai dữ liệu vào trong database

- Thì chúng ta cũng sẽ validation luôn ở tầng `validate` thì nó cũng validate luôn thằng `mongosh`

- Với những collection đã có từ trước rồi thì có thể sử dụng mongocomppass để mà addschema vào

- Nếu mà thêm một collection mới mà nó không khớp với cái `validation` ở trong database thì quăng ra cái lỗi luôn

- Tips for `jsonSchema validation` dùng `\_id` Field và `AdditionalProperties` thì mongoDB nó sẽ không cho phép những cái `document` nào nó không khớp những thuộc tính nằm trong `Validation schema properties`(validation) -> Đôi lúc thêm như thế này thì nó sẽ bị thừa dữ liệu -> thêm trường `AdditionalProperties` vào để chúng ta không cho thêm trường nào bên ngoài vào ngoài các trường ở ttrong `properties`

- Mỗi lần khai báo thì nó sẽ tự động add vào trường `\_id` cho chúng ta, nhưng mà khi chúng ta không khai bóa nó bên trong cái `properties` thì nó sẽ bị lỗi -> Đây là một cái `tips` nhỏ trong `validaiton schema database`

- Trường `Required` bên trong `validation` -> Bình thường khi mà chúng ta thêm một cái `document` vào mà khai báo thiếu một cái thuộc tính thì nó vẫn cho phép chúng ta `pass` qua -> Như thế này thì vẫn chưa chặt chẽ lắm => Nên là trong những trường hợp như thế này thì nên dùng `required`

- Để bắt buộc người dùng chèn vào các trường như chúng ta mong muốn thì phải thêm `required` vào

- Nếu mà validate regex ở bên trong database thì phải đòng nhất `regex` giữa server và database

- Các trường trong schema `User` khi người dùng đăng ký không phải là trường nào cũng được điền -> Nhưng mà chúng ta sẽ để cho nó là một cái string rỗng nên là chúng ta sẽ `required` nó hết ở trong `database`

### Code Logic verifiedUserValidator

### Code Logic updateMeValidator và updateMeController

### Code filterMiddleware để lọc data body

### Bàn về khuyết điểm của verifiedUserValidator

### Get user profile

### Follow User

### Unfollow User

### Fix bug unique username

### Change Password

## OAuth 2.0

## Xử lý Media

### Upload file bằng Formidable

- Đôi khi cái gợi ý của nó sx không có vài options của V3 -> Do chúng ta sử dụng @types version 2 -> Nên là chuẩn nhất là lên document dể đọc

- Chúng ta muốn khi mà chúng ta upload thì nó sẽ vào thư mục như chúng ta đã khai báo

- Mặc định sẽ cho upload vô hạn file -> Mình sẽ giới hạn lại chỉ cho upload 1 file

- Lấy luôn đuôi mở rỗng cho nó luôn -> Vì khi mà uploads chúng ta không biết đây là file gì pdf hay là file ảnh

### Tạo folder upload

### Filter upload ảnh

- Nếu mà throw một cái lỗi trong callback async thì nó sẽ không làm function bọc ở ngoài `rejected` được -> Khi mà nó có lỗi thì ứng dụng sẽ không bắt được lỗi đó do nó nằm trong một cái callback async -> Nên là ứng dụng của chúng ta sẽ bị `crash app` thì chúng ta cần phải bắt được cái lỗi này -> Nên chuyển nó `callback async` thành một cái `Promise`

- Thêm filter vào để chúng ta chỉ cho phép upload Image không cho phép upload file PDF -> Dựa vào cái `mimeType` để có thể check được kiểu dữ liệu của tấm hình -> Và check cả image vì chúng ta mong muốn ngta gửi lên key là `image` chứ không phải là một cái key nào khác

- Khi mà không gửi gì lên thì nó vẫn vượt qua được vòng `filter` của chúng ta -> Nó không chạy vào trong `filter` nên là chúng ta không có check được cái lỗi ở đây

### Xử lý ảnh với Sharp

- Đôi lúc cần phải remove EXIF và metadata đi để giảm kích thước của tấm hình của chúng ta đi -> 1 cái thư viện bên Nodejs hỗ trợ cho chúng ta xử lý ảnh đó là sharp -> Thì đây là thư viện `high performance image processing` có thể coi là thư viện số một về xử lý ảnh bên NodeJS rồi

- Sẽ xử lý chuyển tất cả ảnh sang `JPEG` hết

- Rồi khi mà chuyển đổi từ image này sang image khác thì chúng ta lưu ở đâu -> Thì chúng ta sẽ lưu tạm vào cái thư mục `temp` -> Khi mà gửi tấm ảnh lên thì không cần gửi thêm `metadata` của tấm ảnh làm gì

- Khi mà upload lên thì chúng ta muốn nó `result` về một cái `URL` hay vì result về kết quả file -> Do hiện tại chúng chưa khai báo route `/uploads/{nameFile}`

- Sau khi upload xong thì chúng ta muốn xóa đi tấm ảnh ở thư mục `temp` -> Mục đích của việc đưa vào thư mục tạm là để chúng ta xử lý tấm ảnh đó -> Sau khi upload xong thì chúng ta cần phải xóa file trong thư mục `uploads/temp` -> Có thể `fs` hoặc là `fs/promise` để xóa đi ảnh trong thư mục `temp`.

### Xử lý tham số truyền từ command

- Sẽ xử lý tiếp vài vấn đề nữa với file ảnh

1. folder `uploads` nên bỏ vào `.gitignore` vì đẩy lên git sẽ khá nặng
2. Để folder `uploads` trong máy tính local sẽ không thể share file với mọi người trong team được. => Giải pháp là upload lên một nền tảng như S3, hoặc upload lên server của chúng ta

- Giả sử khi Server vẫn sử dụng folder `uploads` thì phải trả về `domain` của chúng ta -> Vậy thì chúng ta phải check được đâu là môi trường chúng ta dev, đâu là môi trường trên server của chúng ta để trả về kết quả cho nó đúng

- Có thể dùng JS để check nó ở trong cái môi trường nào, nhưng ở đây là recommend là sử dụng thư viện `minimist` -> Thằng này có chức năng là `parse` cái `argv` của chúng ta

### Serving static file

- Thực hiện phục vụ tập tin tĩnh -> Chúng ta muốn là khi mà click vào đường link thì phải show ra được tấm ảnh cho chúng ta

### 1 cách khác để serve static file

- Sẽ có thêm một cách nữa để mà `serving static file` -> Sẽ serving theo cái cách mà chúng ta hay thường làm là tạo `routing` `GET`

- Nếu mà có lỗi thì nó sẽ cho ra lỗi là `500` -> Chỗ này chúng ta có thể custom cái lỗi này

- Nếu mà dùng error callback mà không có `res` trog trường hợp lỗi -> Nếu mà đường đẫn bị sai thì nó sẽ nhảy vào cái `callback Error` chứ nó không response cho chúng ta -> Vậy nên khi là có lỗi thì chúng ta cần phải `res` cho nó ở bên trong cái function lỗi

### Upload multiple image

- Dùng map để Promise.all tất cả các file bên trong để tiết kiệm thời gian

- Có 4 cái File đưa lên thì không nên await từng cái file mà nên dùng Promise.all

- Mặc định `maxTotatFileSize` nó sẽ lấy giá trị mặc định là `maxFileSize`

### Upload video

### Streaming video

### Fix bug header Content-Range không play được video

### Tìm hiểu về HLS Streaming

### Encode video sang HLS

### Fix lỗi encode HLS không được

### Play HLS Streaming trên client

### Fix bug chọn resolution.width dẫn đến convert command bị sai

### Xử lý encode video bằng queue

### Kiểm tra status video encode

### Retro chương media

````{
$jsonSchema: {
bsonType: 'object',
title: 'Refresh Token object validation',
required: [
'_id',
'name',
'email',
'date_of_birth',
'password',
'created_at',
'updated_at',
'email_verify_token',
'forgot_password_token',
'verify',
'bio',
'location',
'website',
'username',
'avatar',
'cover_photo'
],
properties: {
\_id: {
bsonType: 'objectId',
description: '\'\_id\' must be a ObjectId and is required'
},
name: {
bsonType: 'string',
description: '\'token\' must be a string and is required'
},
email: {
bsonType: 'string',
description: '\'user_id\' must be a ObjectId and is required'
},
date_of_birth: {
bsonType: 'date',
description: '\'date_of_birth\' must be a date and is required'
},
password: {
bsonType: 'string',
description: '\'created_at\' must be a date and is required'
},
created_at: {
bsonType: 'date',
description: '\'created_at\' must be a date and is required'
},
updated_at: {
bsonType: 'date',
description: '\'updated_at\' must be a date and is required'
},
email_verify_token: {
bsonType: 'string',
description: '\'email_verify_token\' must be a string and is required'
},
forgot_password_token: {
bsonType: 'string',
description: '\'forgot_password_token\' must be a string and is required'
},
verify: {
bsonType: 'int',
'enum': [
0,
1,
2
]
},
bio: {
bsonType: 'string',
description: '\'bio\' must be a string and is required'
},
location: {
bsonType: 'string',
description: '\'location\' must be a string and is required'
},
website: {
bsonType: 'string',
description: '\'website\' must be a string and is required'
},
username: {
bsonType: 'string',
description: '\'username\' must be a string and is required'
},
avatar: {
bsonType: 'string',
description: '\'avatar\' must be a string and is required'
},
cover_photo: {
bsonType: 'string',
description: '\'cover_photo\' must be a string and is required'
}
},
additionalProperties: false
}
}```
````

````{
  $jsonSchema: {
    bsonType: 'object',
    title: 'Refresh Token object validation',
    required: [
      '_id',
      'token',
      'user_id',
      'created_at',
      'iat',
      'exp'
    ],
    properties: {
      _id: {
        bsonType: 'objectId',
        description: '\'_id\' must be a ObjectId and is required'
      },
      token: {
        bsonType: 'string',
        description: '\'token\' must be a string and is required'
      },
      user_id: {
        bsonType: 'objectId',
        description: '\'user_id\' must be a ObjectId and is required'
      },
      created_at: {
        bsonType: 'date',
        description: '\'created_at\' must be a date and is required'
      },
      iat: {
        bsonType: 'date',
        description: '\'iat\' must be a date and is required'
      },
      exp: {
        bsonType: 'date',
        description: '\'exp\' must be a date and is required'
      }
    },
    additionalProperties: false
  }
} ```
````
