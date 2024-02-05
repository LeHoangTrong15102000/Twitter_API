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

### Fix bug Refresh Token

### Index refresh_tokens video_status_followers

### Tối ưu index khi khởi động Server

### Bonus một số tiếp tối ưu MongoDB

## Chức năng Tweet

## Chức năng Search nâng cao
