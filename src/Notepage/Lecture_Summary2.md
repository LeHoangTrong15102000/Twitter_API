# Học NodeJS Super Với TypeScript

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

## Tối ưu hiệu suất MongoDB

## Chức năng Tweet

## Chức năng Search nâng cao
