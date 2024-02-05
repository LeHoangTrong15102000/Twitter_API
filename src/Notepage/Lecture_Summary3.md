# Khoá học NodeJS Super - Con đường trở thành Backend Developer

## Tối ưu hiệu suất MongoDB

### Compound Index là gì

- Khi mà chúng ta tìm bằng compound Index thì chúng ta chỉ muốn nó return về 4 document thì trong lúc lặp để tìm kiếm thì nó cũng chỉ lặp qua 4 thằng document mà thôi(hay vì phải lặp qua nhiều thằng rồi rồi return về các document hợp lệ) -> Vậy thì phải làm

  - Khi mà chúng ta tìm kiếm document có `{age: 30 , sex: 'male'}` mà chúng ta chỉ có index mỗi thằng sex thì nó sẽ lặp qua `500 document` rồi mới trả về kết quả cho chúng ta

  - Và chúng ta nhận ra được rằng khi mà chúng ta index thằng `age` thì nó sẽ query nhanh hơn cho chúng ta vì khi chúng ta search số người trong độ tuổi `30` mà chỉ index `male` -> Thì nó sẽ lặp qua `500 document` vì đâu phải ai là `male` cũng trong độ tuổi `30` -> Nên là `index age` sẽ có lợi hơn

  - Nên là thay vì chúng ta index `age_1` và `sex_1` và tìm kiếm `{age: 30 , sex: 'male'}` thì nó sẽ chạy qua `9 document` -> Thay vào đó chúng ta sẽ `Compound Index(index hỗn hợp)` như `sex_1_age_1` thì lúc này nó sẽ chạy qua `4 document` và trả về `4 document` cho chúng ta -> Nó nhanh hơn rất là nhiều khi mà chúng ta `index` từng thằng.

  - Tên index dựa vào tên `field` và loại index của chúng ta

### Index sắp xếp tăng dần và giảm dần

- Inđex sắp xếp theo tăng dần và giảm dần

- Khi mà chúng ta để là `sex_1_age_1` thì mặc định nó sẽ sắp xếp tăng dần theo độ tuổi(sex thì vẫn là male nên tăng dần theo sex thì nó không có ý nghĩa) -> Còn nếu như mà chúng ta để là `sex_1_age_-1` thì nó sẽ sắp xếp giảm dần, số document mà nó query vẫn như cũ.

- Việc sắp xếp tăng dần hay giảm dần thì nó đều có ý nghĩa -> Vì khi mà data chúng ta lớn lên thì chúng ta dùng method `sort` thì nó sẽ tốn thời gian hơn so với cái việc mà chúng ta mặc định cho nó sort theo `cái chiều` mà chúng ta mong muốn

- Chứ chúng ta đừng để `sex_1_age_-1` rồi qua method `sort` chúng ta để `{sort: 1}` thì nó lại tốn thời gian hơn -> Nên là chúng ta thay xử lý theo kiểu nào thì chúng ta cứ để theo kiểu đó

### Compound index rồi thì có cần index từng trường hay không

- Là nên sử dụng kết hợp cả `compound index` lẫn `index` để tăng hiệu suất của `MongoDB` -> Đôi lúc chúng ta query riêng biệt sử dụng `fields` `age` `sex` thì chúng ta vẫn nên `inđex` nó

- Khi mà có `sex_1_age_-1` và `age_1` thì thằng MongoDB nó sẽ dùng thằng `compound index` nhưng mà công dụng của 2 thằng là y như nhau cả

### Index text

- Index text search rất là phổ biến trong MongoDB -> thì khi qua `Indexes` cho cái field là address và type là text đồng nghĩa với việc chúng ta cho thằng `search` can thiệp và tìm kiếm trong thằng `address`

- Trong một collection thì chỉ cho phép một `text-search` duy nhất -> Để có thể tạo nhiều text-search thì chúng ta `compound-index` nó lại

- Trong trường hợp muốn search chính xác cái key của chúng ta thì chúng ta sử dụng `\"{key-search}\"` là nó sẽ tìm kiếm chính xác từ khoá cho chúng ta

### Thao tác index bằng dòng lệnh

- Sẽ thực hiện thao tác index bằng dòng lệnh

- Muốn cập nhật cái index đó đi thì phải xoá cái `index` đó đi rồi tạo mới nó lại, chứ nó không cho phép ta cập nhật trực tiếp cái `index` đó

### Ưu nhược điểm của index

- Bàn về ưu và nhược điểm của Index trong `MongoDB`

### Index các trường trong collection Users

- Thực hiện Index các trường trong Collection Users

- Vậy thì trong cái `collection users` trong dự án của chúng ta thì chúng ta nên `index` cái gì

- Để mà biết `index` cái gì thì chúng ta vào cái source code của chúng ta xem chúng ta `query` cái gì, `find` cái gì

- Trong middleware của `users` chúng ta có `findOne({email, password})` phù hợp với `compound index`

  - Chúng ta thấy có email, password, username,

  - Thì thằng email và password chúng ta tìm kiếm chung nên là sẽ cho nó thành một cái `compound index`

- Chúng ta sẽ tạo cái fuction để hỗ trợ việc tạo index này

- Email nên chèn một cái `unique` vào cho nó để lỡ hệ thống có một cái `email` y như vậy thì nó sẽ báo lỗi cho chúng ta

- Gọi indexUsers khi mà cái database của chúng ta nó đã được `connect()` -> Chúng ta muốn hàm connect nso chỉ thực hiện thành động connect thôi không còn thưc hiện hành động nào khác nữa -> Nên là đưa nó ra ngoài là hợp lý nhất

- Khi mà chúng thực hiện các function thì chúng ta nên hạn chế những cái `side effect` nhất có thể

- Khi mà thực hiện connect xong thì chúng ta sẽ gọi tới cái `indexUsers`

### Fix bug Refresh Token

- Exp và iat nên lưu theo kiêu Date() để chúng ta tìm và xử lý trong MongoDB nó sẽ tiên hơn nhiều

- Có 2 cách để quy định exp đó là cách đầu tiên chúng ta truyền exp vào `payload`

  - Cách thứ 1 là truyền vào thời điểm hết hạn -> tức là thời điểm nào đó trong tương lai
  - Cách thứ 2 là truyền vào thời gian hết hạn -> 1 ngày, 2 ngày gì đấy

- Người dùng cứ truyền vào number, còn chuyện covert cứ để thằng `refreshTokensSchema` sẽ covert trước khi nó gửi lên `databases`

- Covert từ `EpochTime` sang `Date` thì chỉ cần nhân cho 1000 là được

### Index refresh_tokens video_status_followers

### Tối ưu index khi khởi động Server

- Tối ưu index khi khởi động lại server

- Khi mà run cái app của chúng ta lên nếu mà collection nó đã được index rồi thì chúng ta không khởi tạo index nữa -> Nó sẽ gây thất thoát về `performance` không đáng có

### Bonus một số tips tối ưu MongoDB

- Tối ưu MongoDB

- Ngoài việc inex thì dưới đây là 1 số tips để chúng ta có thể tối ưu hơn.

  - Phân tích câu truy vấn với `explain`

  - Dùng MongoDB Driver lúc nào cũng nhanh hơn dùng các ODM (ORM) như Mongoose, Prisma vì nó bỏ qua các lớp ảo hoá và truy vấn trực tiếp vào database.

    - Ưu điểm của những thằng như là Mongoose Prisma là chúng ta có được những chức năng nâng cao làm chúng ta code nhanh hơn, chúng ta có cái `type_set`

    - Khuyết điểm là chúng ta phải đánh đổi bằng cách `performance` của chúng ta -> Khi mà chúng ta có những câu `query` phức tạp thì những thằng này nó sẽ lộ cái khuyết điểm của nó ra

  - Để server của MongoDB gần với server của bạn nhất có thể.

## Chức năng Tweet

## Chức năng Search nâng cao
