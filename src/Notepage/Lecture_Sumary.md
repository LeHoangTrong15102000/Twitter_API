# Khóa học NodeJS ExpressJS - Viết API Twitter

## Kỹ năng debug xử lý lỗi

### Kỹ năng debug xử lý lỗi, Run và Debug lỗi trong NodeJS

## Phân tích và thiết kế CSDL bằng MongoDB

### Phân tích Schemas cho Users

- mới vừa tạo thì thằng `updatedAt` sẽ bằng luôn với thz `createdAt` -> Làm như vậy thì nó vừa đơn giản vừa dễ hiểu nữa/

### Phân tích follower collection

- Khi mà chúng ta tách ra thành một collection riêng thì khi cần chúng ta có thể lookup để tìm kiếm những `following` và những `follower` của `user` -> Mặc dù là hơi lâu hơn so với việc chúng ta nhúng vào trong `user` -> Nhưng làm như vậy để tránh việc chúng ta vượt quá `16mb` của 1 `document` trong `MongoDB`.

- Cái `Collection` về `Follower` này thì hơi `hack não` một tí nên là cần xem cẩn thận lại một tí

- Thì khi thiết kế ra như thế này rồi thì một `document` nó sẽ đại diện cho một mối quan hệ `follow`

### Phân tích chức năng Tweet Collection

- `Tweet` là tính năng quan trọng ở bên phía `Twitter`

- Nếu mà cứ làm các tweet mà nested với nhau thì nó rất khó để có thể query được

- Vậy nên cách tốt nhất là sẽ lưu trường `parent_id` để biết được là tweet này là con của ai. Nếu `parent_id` là `null` thì nó là `tweet gốc`

## Chức năng Authentication

### Routing trong expressJS

- Khi mà `res.status(400).send("Not Allowed")` thì đoạn code phía bên dưới vẫn chạy mặc dù là nó không trả về kết quả cho phía `client` mà thôi -> Khi mà chúng ta đã `next()` tới những cái `logic` tiếp theo thì đoạn code phía dưới `next()` vẫn chạy nhưng mà nó không có tác dụng gì hết

### Cấu trúc dự án - cách đặt tên và chia thư mục

- Những cái mà liên quan đến gọi và xử lý trong database thì đưa hết vào trong cái service này -> `Controller` nó sẽ gọi đến `Service` và `Service` nó sẽ xử lý database gì đấy và trả về cho `Controller`

- Phía client gửi lên dạng `JSON` nên chúng ta cần `parse` nó sang dạng `Object` thì chúng ta mới có thể xử lý được

- Mô hình trong này gần như là sử dụng `80% mô hình thực tế` mà chúng ta áp dụng trong lúc đi làm rồi đấy -> Nên là cứ tự tin học rồi đi phỏng vấn không có gì phải lăn tăn cả -> Tập trung học thì chúng ta sẽ học được rất là nhiều thứ

### Kết nối MongoDB Atlas bằng MongoDB Driver

- Có rât nhiều thư viện để validate cho dữ liệu ở phía BE của chúng ta ví dụ như: Joi, Zod, Jup, ... là ba thằng phổ biến nhất -> Nhưng trong dự án chúng ta chỉ cần sử dụng `express-validator` là đủ để `validate` dữ liệu

## Kỹ thuật dùng Postman

## Chức năng User

## OAuth 2.0

## Xử lý Media

## Tối ưu hiệu suất MongoDB

## Chức năng Tweet

## Chức năng Search nâng cao
