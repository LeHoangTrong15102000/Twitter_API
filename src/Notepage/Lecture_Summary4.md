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

- Khi mà chúng ta lưu lại bên phía React nó sẽ sử dụng 1 cái gọi là hot reload -> Nghĩa là nó không có F5 lại hoàn toàn mà nó sẽ giữ nguyên trạng thái lúc nảy - mà nó sẽ kết nối lại một cái kết nối mới -> Nên vì thế khi mà giữ nguyên trạng thái lúc nảy và kết nối lại kết nối mới thì cái `tin nhắn` gần nhất nó sẽ `được thêm vào` mỗi khi mà chúng ta `nhấn lưu`

- Khi mà lưu lại thì thằng socket-client nó sẽ bắn l ên server một tín hiệu và cái `callbackfunction` trong event `connection` nó sẽ chạy lại và tạo một cái `instance` mới

### Nhắn tin qua lại giữa 2 người

- App của chúng ta chỉ đang có thể chat được một chiều mà thôi -> Do chúng ta đang set cứng ứng dụng của người nhận

- Bài toàn của chúng ta là làm sao để có thể nhắn qua lại giữa 2 người đều có thể nhận được cả

  - Bình thường khi mà chúng ta muốn nhắn tin với 1 người nào đấy thì chúng ta cần có `user_id` của người đấy

  - Nên chúng ta sẽ giả sử có được username của người đó

  - Thì chúng ta đang làm hơi thủ công một tí xíu nhưng mà nó vẫn hoạt động được

  - Nếu chúng ta gửi vào người không tồn tại thì nó sẽ thông báo lỗi -> Nếu mà chúng ta không nhấn vào `user1` mà chúng ta gửi tin nhắn đi thì nó sẽ bị lỗi -> lỗi này chúng ta sẽ fix sau

### Thiết kế conversations schema

- Có một cái vấn đề khi mà chat giữa 2 người là đó là khi mà F5 lại thì nó biến mất -> Đó là do chúng ta chưa lưu data ở `database`

- Với cái quan hệ một rất nhiều -> Thì chúng ta sẽ tạo một cái `conversation Collection` liên kết với `user` bằng cách tham chiếu cái `conversation_id` vào collection của `user`

- Trước khi mà `emit` một cái sự kiện thì chúng sẽ lưu vào database thông tin của cuộc hội thoại đó

### Code route get conversations

- Khi mà người gửi bắt đầu

- get list tin nhắn giữa chúng ta và người khác thì chúng ta dùng method là `GET`

  - Lấy thông tin người gửi và người nhận thì chúng ta cần lấy thông tin `sender_id` và `receiver_id` chứ chúng ta không thể lấy `_id` của đoạn hội thọai vì nó chỉ chứa thông tin của một đoạn hội thoại mà thôi

  - Khi chúng ta get list thì chúng ta muốn là có tin nhắn thằng 1 gửi cho thằng 2 và cả tin nhắn thằng 2 gửi lại cho thằng 1 luôn.

- Khi mà `get conversations` thì chúng ta muốn lấy ra tin nhắn của cả 2 phía người gửi -> Nên là ở logic `conversations services` chúng ta sẽ chỉnh sửa nó lại một tí xíu

  - Sẽ dùng toán tử `$or` trong mongoDB -> `$or` nhận vào một cái `Array` và chúng ta truyền vào `điều kiện thứ 1` và `điều kiện thứ 2`

- Sau khi đã `get conversations` của cả 2 người rồi thì chúng ta sẽ tiến hành phân trang luôn cho nó

  - Khi mà chúng ta nhắn tin với một người nào đó thì khi lướt đến đâu thì chúng ta sẽ load đến đó -> Đó là dùng kĩ thuật `infinite scroll` -> Vì tin nhắn thì nó rất là nhiều chúng ta không thể trả hết tin nhắn về cho người dùng được

  - limit và page khi mà lấy từ query ra nó sẽ là `string` hoặc là `undefined` nên là chúng ta phải convert nó sang Number

  - Khi tìm với `find` thông thường thì nhớ `toArray()`

### Apply API get conversations vào client chat

- Chỉ emit content không thì vẫn không đủ nên `emit` cả cục vừa mới insert vào bên trong `conversations collection`

  - Không cần phải dùng find() để tìm ra cái `conversations` vừa mới insert vào mà chúng ta có thể dùng `insertId` mà cái MongoDB trả lại khi mà chúng ta thêm `conversations` vào `database`

  - Sau khi lấy được insertId rồi chúng ta có thể dựa vào `insertId` để lấy ra data vừa được đưa vào database xong rồi chúng ta sẽ tạo một cái object để bắn lại cho người nhận

  - Và cái `object` đấy cũng cần phải có cái `date()` -> Thì cái `date()` chúng ta cũng đã có sẵn khi mà chúng ta tạo `conversations collections` rồi

  - Sửa lại biến content thành payload cho nó tường minh một chút -> Sẽ chuẩn hóa nó lại một chút

  - Vì ở dưới chúng ta có dùng `_id` làm `indexKey` nên là chúng ta cần phải tạo ra một cái `_id` lúc gửi tin nhắn

  - Khi mà dùng `created_at: -1` thì tin hội thoại mới nhất nó sẽ nằm bên dưới và ứng với mảng `array conversations` bên FE thì tin mới nhất sẽ là phần tử đầu tiên

  - Hiện tại đang set cứng cái limit và page trong vài cái video tới thì chúng ta sẽ set động tới 2 biến `Limit` và `Page` -> Sẽ sử dụng kỹ thuật là `Infinite Scroll` vào `Frontend`

### Cập nhật validator cho route get conversations

### Code infinite scroll cho React

### Debug websocket trên chrome

### Middleware Server Instance

## Swagger
