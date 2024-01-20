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

### Validate và Sanitize bằng Express Validator

- thằng Express Validator nó khôngg tự động trả về lỗi cho phía `Client` - mà là chúng ta phải tự custom lỗi đó để trả về cho phía `client`

- Chúng ta sẽ sử dụng cái function là `validationResult` của thằng`express-validator` để nó lấy cái `lỗi` từ cái `express-validator` -> Vì cái đoạn `query('person').notEmpty()` nó lấy được lỗi nhưng mà nó vẫn chưa xử lý được cái gì cả

- Nếu chúng ta cho người dùng nhập vào tuỳ ý thì nó rất là nguy hiểm -> Nên vì vậy chúng ta cần phải vệ sinh dữ liệu đầu vào của mình

- Hàm matchedData thì nó sẽ trả về cho chúng ta những `dữ liệu`(dưới dạng object) đã được `validate` và `sanitize` -> Khi mà chúng ta lấy như này thì chúng ta đảm bảo được rằng dữ liệu chúng ta lấy thì nó luôn được chính xác và đã được `validate` và `sanitize` một cách an toàn rồi

### Dùng CheckSchema để validate body register

- Cách sử dụng `express-validator` thể nào cho nó hợp lý nhất

- Dạo gần đây thằng `express-validator` nó có `schema validation` rồi nên là nhìn nó trực quan với dễ nhìn hơn

- Khi chúng ta giao tiếp giữa client và server những cái kiểu ngày giờ như này -> thì chúng ta sẽ gửi lên `server` theo kiểu là `ISOString` có kiểu là `ISO8601`

- Cũng phải gửi lên `confirm_password` để mà chúng ta `check` và `validate` với `password`

- Sẽ `sanitize` bằng các hàm như là `trim()`

- `isStrongPassword` thì khi mà chúng ta không check returnscore thì nó sẽ trả về true hoặc false cho chúng ta chứ nó sẽ không check độ mạnh của `password` là từ 1 tới 10

- Cái luồng chúng ta mong muốn là khi mà nó đi qua cái `registerValidator` mà có lỗi thì nó sẽ xuất lỗi ra luôn

- Sẽ tạo một cái `validationRunner` để mà bắt lỗi trong lúc `validate` dữ liệu -> Bởi vì chúng ta sử dụng cái checkSchema nên là chúng ta sẽ sửa lại cái kiểu `type` `validationChain` một chút xíu -> Nếu như ở bên trong `registerValidator` nó có lỗi thì hằng hàm `validate` nó sẽ xuất ra lỗi luôn -> Nhờ thế nó sẽ không cho chạy vào thằng `registerController`

- Thằng validate nó return về một cái function thì nó sẽ khớp với các `params` của các giao thức như `POST` vì thằng `POST` nhận vào các `handler` mà `handler` là những cái function

  - Mà ngặc một cái là thằng `validationChain` nó không có method là `run()` còn thằng `checkSchema` thì nó lại có method là `run()`
  - Nên là để chặt chẽ hơn thì chút ta sẽ cho thằng `params` `validation` có kiểu là `RunnableValidationChains<ValidationChain>` để cho nó có thể gọi được tới method là `run()`

  - `await validation.run(req)` nó sẽ check lỗi và đưa lỗi vào trong một cái biến đó là `req`
  - và cái function `validationResult(req)` lấy lỗi ra từ biến `req`

- Ở trong hàm validation nếu mà chúng ta lấy `error.array()` nó sẽ lấy ra nhiều lỗi -> Còn khi mà dùng `error.mapped()` thì nó sẽ gộp lại thành một lỗi duy nhất

### Kiểm tra email có tồn tại hay

- Kiểm tra xem email đã tồn tại hay chưa

### Tạo Access Token và Refresh Token

### Error handle trong Express.js

### Tạo wrapRequestHandler để xử lý lỗi

### Chuẩn hoá bộ xử lý lỗi

### Khai báo Mesage Validation

### Xử lý logic Login

### Cập nhật logic Login và config env

### Access Token middleware cho Logout

### Refresh Token middleware và Logout logic

## Kỹ thuật dùng Postman

## Chức năng User

## OAuth 2.0

## Xử lý Media

## Tối ưu hiệu suất MongoDB

## Chức năng Tweet

## Chức năng Search nâng cao