# Học NodeJS Super Với TypeScript

## Xử lý Media

### Upload file bằng Formidable

- Đôi khi cái gợi ý của nó sx không có vài options của V3 -> Do chúng ta sử dụng @types version 2 -> Nên là chuẩn nhất là lên document dể đọc

- Chúng ta muốn khi mà chúng ta upload thì nó sẽ vào thư mục như chúng ta đã khai báo

- Mặc định sẽ cho upload vô hạn file -> Mình sẽ giới hạn lại chỉ cho upload 1 file

- Lấy luôn đuôi mở rỗng cho nó luôn -> Vì khi mà uploads chúng ta không biết đây là file gì pdf hay là file ảnh

### Tạo folder upload

### Filter upload ảnh

- Nếu mà throw một cái lỗi trong callback async thì nó sẽ không làm `function` bọc ở ngoài `rejected` được -> Khi mà nó có lỗi thì ứng dụng sẽ không bắt được lỗi đó do nó nằm trong một cái callback async -> Nên là ứng dụng của chúng ta sẽ bị `crash app` thì chúng ta cần phải bắt được cái lỗi này -> Nên chuyển nó `callback function` thành một cái `Promise` để có thể `Promise.reject(err)` khi mà có lỗi

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

- Chỉ cho phép upload 1 video nhưng phòng hờ thì vẫn trả về array Video cho người ta -> Phòng thờ sau này chúng ta nâng cấp API lên cho phép người dùng `Upload` nhiều video

- Keep extentions ở trong upload video nó bị lỗi nên là chúng ta sẽ custom xử lý cái đuôi file mở rộng của thằng này sau -> Sau khi upload xong thì sẽ nối đuôi file mở rộng vào

### Streaming video

- Sẽ tiến hành `streaming-video`

- Cái serve static chỉ có tác dụng mà chúng ta `serve static image` thôi còn cái video thì nó sẽ có vấn đề

  - Khi mà đưa qua serving static video mặc định của thăng expresJS thì nó hoạt động rất là oke -> Ban đầu chúng ta không tải hết kích thước toàn bộ của video -> Load đến đâu thì chúng ta sẽ tải đến đấy

  - Chúng ta có thể tự custom streaming video cho chính chúng ta

- Thì đầu tiên khi mà stream thì client nó sẽ gửi lên request cái thuộc tính rất là quan trọng đó là `range` ở `Request Headers`

- Sẽ đọc coi thử dung lượng video đấy bao nhiêu byte -> Sau đó chúng ta sẽ trả về cho client từng đoạn dung lượng -> Ví dụ như dung lượng video đấy là 100MB đi chẳng hạn, đoạn đầu tiên dựa vào khoảng thời gian chúng ta trả về 1-10MB, rồi 11MB - 20MB, 21MB - 30MB, ... -> thì sẽ trả về theo từng cái byte, thì cái mấu chốt của streaming là như thế

### Fix bug header Content-Range không play được video

- End phải luôn luôn nhỏ hơn videoSize nếu lớn hơn thì không được -> Nếu end mà bằng videoSize thì nó sẽ không có chấp nhận và cái video nó sẽ không load được

### Tìm hiểu về HLS Streaming

- Sẽ học kĩ thuật streaming nâng cấp hơn xíu đó là `HLS Streaming` -> Trên youtube hay Netflix cho phép chúng ta phát video với nhiều độ phân giải khác nhau thì biết quyết ở giao thức `Adaptive Streaming` -> Cho phép server phát video với nhiều độ phân giải khác nhau, `bitrate` khác nhau -> server sẽ chọn độ phân giải và bitrate phụ thuộc vào tốc độ mạng của người dùng.

- Có 2 giao thức Adaptive Streaming phổ biến nhất hiện nay là `HLS` và `DASH` -> HLS thì phổ biến trong hệ sinh thái `Apple`

  - Stream là khái niệm phát video từ server cho người dùng xem, còn live stream là phát video trực tiếp

  - Stream video truyền thống thì chúng ta không cần phải setting cái gì nhiều cả, thằng expressJS nó đã hỗ trợ cho chúng ta, chúng ta chỉ cần truyền đường dẫn đến folder upload là được

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
