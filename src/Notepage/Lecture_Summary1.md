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

### Resend verify email

### Forgot password

### Verify forgot password token

### Reset password

### Get me

### MongoDB Schema Validation

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

## Tối ưu hiệu suất MongoDB

## Chức năng Tweet

## Chức năng Search nâng cao
