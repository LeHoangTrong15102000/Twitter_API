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

## Kỹ thuật dùng Postman

## Chức năng User

## OAuth 2.0

## Xử lý Media

## Tối ưu hiệu suất MongoDB

## Chức năng Tweet

## Chức năng Search nâng cao
