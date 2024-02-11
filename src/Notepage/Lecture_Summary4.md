# Khóa học NodeJS - Super

## Sử dụng dịch vụ AWS

- Trong đây sẽ sử dụng SES để gửi email và S3 để lưu trữ file cho các video trong app của chúng ta

- Ngoài AWS ra thì chúng ta còn có các dịch vụ khác để gửi email như là `SendGrid`, `MailGun` 2 thằng này là ở hệ thống level cao không cần phải setup phức tạp mà có thê sử dụng luôn -> Nên là chi phí sẽ cao hơn khi sử dụng `SES` của AWS

- Học cách sử dụng SES của AWS

- Nó vẫn phải được Identities - đã được AWS Identities

- Effective typescript
  -> `https://books-library.net/files/books-library.net-10121732Pl7G6.pdf`

## WebSocket

- Socket.io là thư viện javascript cho phép chúng ta sử dụng websocket trong các ứng dụng web của minh

- Công dụng lớn nhất của socket.io là đơn giản hóa việc sử dụng websocket, việc thứ 2 là tăng độ tin cậy khi chúng ta sử dụng websocket

- Khi mà trình duyệt không hỗ trợ websocket thì thằng socket.io này hỗ trợ cái `fallback(cơ chế dữ phòng)` nếu như mà không có websocket thì nó sẽ chuyển sang một cái cơ chế khác đó là `HTTP-long-polling` để đảm bảo với những cái trình duyệt không hỗ trợ websocket

- Hàm `emit` trong `socket.io` là method cực kì quan trọng của `socketio`

- Cả server và client đều có thể emit sự kiện -> Để những ai nhận được thì sẽ nhận sự kiện đó

- Khi mà client kết nối thành công thì nó sẽ gọi tới callback socket của server -> Chỉ cần một cái thằng nào đó kết nối thì cái `socket callback` của server sẽ được gọi

  - Khi mà cái callback socket được gọi thì cái `socket.emit()` bên trong nó sẽ được gọi

  - Khi mà `socket.emit()` nó được gọi thì bên client sẽ nhận được bầng cách lắng nghe sự kiện đó

  - Đó là cái luồng chạy của `socket.io` ở `client` và `server`

### Private Message giữa 2 người

- Thì khi chat giữa 2 người thì cần có `id_user` của người đó thì cả 2 mới có thể chat qua lại được

- Khi mà mình kết nối tới socket.io thì cần gửi định danh của mình lên trên server để server nó lưu vào trong socket rằng là - à thằng này có cái `username` là gì gì đấy và có cái `socketId` là gì gì đấy -> để cho người khác nhắn tin người khác còn biết được

- Khi mà handleSubmit thì cần emit sự kiện lên phía `server` -> Trước khi connect thì cần gửi thông tin lên server biết được là thằng vừa kết nối là thằng nào truyền vào cái `auth` -> Client đã gửi lên `id` thì trên server làm sao để có thể nhận được cái `_id` từ client gửi lên

- 2 thằng kết nối và 2 thằng đều truyền `access_token` lên trên `server`

  - Tạo một cái `users` nâng cao thì nó dùng `new Map()` thì nó sẽ tối ưu `performance` còn chúng ta thì chỉ cần dùng `object` bình thường thôi là được

  - Tại sao chúng ta không lưu trực tiếp thằng `socket_id` vào `_id` của users luôn mà phải lưu thông qua `object` là `access_token`: `{ socket_id: _id }` -> Vì trong tương lai nếu có thêm vào thông tin gì thêm thì chúng ta chỉ cần thêm vào không cần phải thay đổi cấu trúc làm gì

- Khi mà socket client 1 bắt một cái sự kiện thì socket trên server của client 1 sẽ lắng nghe sự kiện, chứ socket-Client2 trên server có lắng nghe được `private message` cũng không có nhận được

  - Khi nào mà `socket-client-2` kết nối vào thì cái `callback function` trên server sẽ gọi lần tiếp theo và tạo ra một cái `instance` mới cho `socket-client-2` - và nó cũng lắng nghe sự kiện `private message` - Nhưng mà `socket-client-2` lắng nghe cũng không có nhiều ý nghĩa gì, chỉ có `socket-client-1` lắng nghe thì mới có ý nghĩa.

  - 2 cái socket-client đều lắng nghe - nhưng chỉ có một socket-client trên server là nhận được

  - Bây giờ thì `socket-client-1` trên server đã lắng nghe được rồi -> Bây giờ sẽ thực hiện gửi tin nhắn cho `socket-client-2` -> Thì gửi như thế nào thì chúng ta sẽ thực hiện như sau

### CSS chia ra người gửi và người nhận trong chat

- State `messages` cần phải update lại xíu nữa -> Sẽ đưa nó thành một cái object để thêm vào đó là tin nhắn của người gửi hay người nhận nữa

- Gửi thì set `isSender` là true còn người nhận thì set `isSender` là false chỉ đơn giản có thể thôi

### Nhắn tin qua lại giữa 2 người

### Thiết kế conversations schema

### Code route get conversations

### Apply API get conversations vào client chat

### Cập nhật validator cho route get conversations

### Code infinite scroll cho React

### Debug websocket trên chrome

### Middleware Server Instance

## Swagger
