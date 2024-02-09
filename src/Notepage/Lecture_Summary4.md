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

## Swagger
