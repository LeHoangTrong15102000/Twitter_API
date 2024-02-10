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

-Khi mà mình kết nối tới socket.io thì cần gửi định danh của mình lên trên server để server nó lưu vào trong socket rằng là - à thằng này có cái `username` là gì gì đấy và có cái `socketId` là gì gì đấy -> để cho người khác nhắn tin người khác còn biết được

## Swagger
