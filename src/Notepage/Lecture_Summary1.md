# Học NodeJS Super qua dự án - Twitter API

## Kỹ thuật dùng Postman

- Thực hiện setup cho postman nó được tiến hành tự động

## Chức năng User

### Verify Email

- Thực hiện `verify Email` cho người dùng cũng là tính năng khá là hay nên là cần phải tập trung hơn nữa

- Sau khi mà người dùng đăng kí tài khoản thì chúng ta sẽ gửi cái email đến email người dùng -> Nội dung bên trong sẽ là `hãy click vào link sau để xác thực mail` -> Khi mà người dùng click vào cái link đấy thì chúng ta sẽ change cái `status` trong cái `database` từ `Unverified` thành `Verified` -> Xong rồi trả lại `access_token` và `refresh_token` đã được `verifed`

  - Khi mà người dùng chưa `verify` chi có thể đăng nhập thôi không làm được điều gì trong đó cả, đợi khi nào `Verified` rồi thì chúng ta mới cho phép người dùng thao tác trên ứng dụng

- Ở phía client sẽ được setting 1 cái đường link như thế này `duthanhduoc.com/verify-email?email_verify_token=1231332131` -> Thì khi mà người dùng click vào cái đường link như thế này thì thằng client `Vue hay React` gì đấy sẽ nhận được 1 cái `email_verify_token` -> Client sẽ thực hiện 1 cái method `POST` với cái URL là API của mình `api-duthanhduoc.com/verify-email` với `body` là `email-verify-token` -> Sau đó `server` sẽ tiến hành xác thực xem `user` này là ai sau đó sẽ thay đổi `verify` cho người đó

  - Ở đây cái luồng của chúng ta là khi mà người dùng click vào cái đường link xong rồi thì đăng nhập luôn -> Lúc này trả về `access_token` và `refresh_token` đã xác thực cho người dùng luôn'

- Cần `validate` `email_verify_token` xem nó có đúng định dạng hay không

- Việc kiểm tra `email_verify_token` có tồn tại hay không thì nên kiểm tra ở `usersController` thì nó sẽ hợp lí hơn

- Khi mà người dùng đã xác thực rồi mà nhấn vào nút xác thực email thì chúng ta vẫn gọi đến `routes` là `/users/verify-email` thì lúc này server sẽ kiểm tra rồi trả về

- Tại sao lại find t heo ID chứ không find theo `email_verify_token` thì cái này liên quan đến cái `index` của `MongoDB` -> Cái ID nó được index thì chúng ta find nó sẽ nhanh hơn

> Xóa refresh_token chưa được xác thực khỏi database

### Mẹo cập nhật thời gian với $currentDate và $$NOW

- Tạo giá trị cập nhật(new Date), MongoDB cập nhật giá trị(sau thời điểm tạo giá trị cập nhật) -> Thì cái thời điểm currentDate sau thời điểm cập nhật giá trị vài trăm ms

- thằng $set { updated_at: new Date} -> là do chúng ta đưa cái Date vào, còn $currentDate: { updated_at } là do MongoDB đưa cái Date vào

- Còn có 1 cái options khác khi mà chúng ta không muốn dùng currentDate đó là

### Resend verify email

- Chỉ cần gửi lại cho người ta một cái email với email-verify-token mới là được

- Yêu cầu phải đăng nhập rồi mới được resend email

- Rồi phải xem người dùng đã `verifyEmail` chưa -> Nếu đã `verifyEmail` rồi mà cứ nhấn liên tục thì không được

### Forgot password

- Sau khi người dùng nhấn vào forgotPassword -> Thì sẽ cho người dùng nhập email rồi sau đó người dùng sẽ click vào đường dẫn thì sẽ đưa người dùng đến trang `reset-password` -> Người dùng tiến hành reset password

### Verify forgot password token

### Reset password

### Get me

- Người dùng chưa verify email thì chúng ta vẫn cho get Profile -> Lấy get Profile chỉ cần truyền access_token lên -> Sau khi đăng kí xong thì cho user vào trang Home luôn -> Xong rồi quăng cái thông báo `hãy kiểm tra email để xác thực email của bạn` song song đó vẫn cho người dùng gọi API `get profile` -> Sau khi xác thực xong thì thông báo cho người dùng là `xác thực email thành công`

- Chỉ cần access_token của người dùng truyền lên để minh biết là người dùng này là ai thôi -> Còn lại không cần verify email

### MongoDB Schema Validation

- Đã thực hiện đưa `User` và `RefreshToken` vào database rồi mà chưa có validation tầng database -> Nên là chúng ta sẽ validation tầng database

- Và chúng ta cũng đã tạo một cái object cho nó đúng cái định dạng trước khi chúng ta đưa vào database -> Nhưng điều này vẫn chưa đảm bảo được nếu mà chúng ta khai báo thừa hoặc thiếu data ở Schema của mỗi Collection -> Rất là dễ xảy ra cái tình trạng mà chúng ta chèn thừa hoặc là chèn sai dữ liệu vào trong database

- Thì chúng ta cũng sẽ validation luôn ở tầng `validate` thì nó cũng validate luôn thằng `mongosh`

- Với những collection đã có từ trước rồi thì có thể sử dụng mongocomppass để mà addschema vào

- Nếu mà thêm một collection mới mà nó không khớp với cái `validation` ở trong database thì quăng ra cái lỗi luôn

- Tips for `jsonSchema validation` dùng `\_id` Field và `AdditionalProperties` thì mongoDB nó sẽ không cho phép những cái `document` nào nó không khớp những thuộc tính nằm trong `Validation schema properties`(validation) -> Đôi lúc thêm như thế này thì nó sẽ bị thừa dữ liệu -> thêm trường `AdditionalProperties` vào để chúng ta không cho thêm trường nào bên ngoài vào ngoài các trường ở ttrong `properties`

- Mỗi lần khai báo thì nó sẽ tự động add vào trường `\_id` cho chúng ta, nhưng mà khi chúng ta không khai bóa nó bên trong cái `properties` thì nó sẽ bị lỗi -> Đây là một cái `tips` nhỏ trong `validaiton schema database`

- Trường `Required` bên trong `validation` -> Bình thường khi mà chúng ta thêm một cái `document` vào mà khai báo thiếu một cái thuộc tính thì nó vẫn cho phép chúng ta `pass` qua -> Như thế này thì vẫn chưa chặt chẽ lắm => Nên là trong những trường hợp như thế này thì nên dùng `required`

- Để bắt buộc người dùng chèn vào các trường như chúng ta mong muốn thì phải thêm `required` vào

- Nếu mà validate regex ở bên trong database thì phải đòng nhất `regex` giữa server và database

- Các trường trong schema `User` khi người dùng đăng ký không phải là trường nào cũng được điền -> Nhưng mà chúng ta sẽ để cho nó là một cái string rỗng nên là chúng ta sẽ `required` nó hết ở trong `database`

### Code Logic verifiedUserValidator

- Khi mà UpdateMe thì cái accessTokenValidator thôi là vẫn chưa đủ, vì chúng ta cần phải check nữa xem là người dùng đã `verify` rồi hay chưa -> Nếu chưa `verify` thì không cho phép người dùng vào `UpdateMe`

- Thêm verify vào `payload` của cái `access_token` để khi mà người dùng updatMe thì chỉ cần kiểm tra verify trong token là được,

  - Không cần phải làm cách rườm rà là lấy ra `user_id` gửi Request lên server xem là người dùng đã `verify` hay chưa, làm như cách này thì sẽ bị chậm và `tăng tải` lên database

- Sẽ khai báo `verifiedUserValidator` để những tài khoản nào vượt qua được thằng này thì mới có thể vào các controller để thực hiện logic -> Cái thằng này sẽ dựa trên cái `decoded_authorization` chứ không dựa trên các trường như `body`, `query` hay `cookie` gì cả

- Cái `handle error` bên express.js nó không thông minh lắm. next(error) thì dùng đâu cũng được. Còn throw error thì chỉ dùng cho sync thôi em. throw trong async thì em phải có 1 cái catch cái đó rồi next(error) sau (tương tự cách mà chúng ta dùng wrapHandler)

### Code Logic updateMeValidator và updateMeController

- UpdateOne thì nó chỉ update cho chúng ta mà thôi không trả về document cho chúng ta, còn `findOneAndUpdate` ngoài việc update thì nó còn trả về `document` cho chúng ta -> Lấy về cái document mới để người dùng `update` lại thông tin của họ(trên client)

### Code filterMiddleware để lọc data body

- Nếu user dùng postman hoặc là client nó xử lý bị lỗi ->Truyền lên những cái field không cần thiết như là `forgot_password_token`, `verify_email_token`

- `UpdateMeValidator` thì chúng ta chỉ check những thằng có trong đó thôi còn không có thì nó sẽ không check -> nên là `forgot_password_token` -> Thì ở trong `Controller` -> khi mà check thì sẽ thấy là truyền lên `forgot_password_token` ở bên trong `body` -> Rồi nó đi sang qua `updateMeService` và cập nhật vào bên trong database thì việc này nó rất là nguy hiểm có thể coi là một `lỗ hỏng bảo mật` => Nên là chúng ta sẽ xử lý chỗ này

  - Chỗ này chúng ta có thể lọc cái body bằng cách chúng ta sử dụng hàm `Pick` của thư viện `lodash`

### Bàn về khuyết điểm của verifiedUserValidator

- Khi mà mình `verifiedUserValidator` thì chúng ta không phải gọi đến `database` để lấy cái `verify` để biết là thằng đó đã được `verify` hay chưa chỉ cần kiểm tra verify trong `access_token`

- Người dùng người ta đăng nhập bằng máy tính và thấy thông báo chưa `verify` `tài khoản` thì người ta mở điện thoại ra để nhấn vào đường link trong gmail để verify tài khoản -> Sau khi verify tài khoản trên điện thoại rồi người ta quay lại trang web và nhấn F5 -> Và không có chuyện gì xảy ra cả(email chưa verify) vì cái `access_token đã verify` nó chưa được gửi lên cho người mà ng dùng vẫn sử dụng `access_token` chưa `verify` -> Và phải đợi access_token hết hạn thì mới trả về `access_token đã verify`

- Thi người ta phải đợi khi mà access_token cũ hết hạn thì người ta mới lấy được access_token mới -> Lúc này thì ngta mới thao tác được với trang info của người ta
  - Để fix được khuyết điểm này thì chúng ta có thể sử dụng trang thái `verify` bên trong database của user -> Nếu vậy mỗi cái `request` nào chúng ta cũng mò vào trong database để kiểm tra thì nó sẽ bị lâu, làm chậm cái `request` đó đi -> Làm như cách này thì cũng không hay
  - Cách dùng có thể chấp nhận được ở đây là sử dụng `web socket` -> Khi mà người dùng xác thực email thành công thì chúng ta sẽ `bắn` 1 cái `sự kiện` thông báo là đã `verify email` thành công và yêu cầu người dùng thực hiện `refresh_token` lại để lấy ra `access_token` đã verify
    -> Mặc dù cách này cũng không toàn diện nhưng cũng giải quyết được phần nào đó

### Get user profile

- Trước khi mà follow user thì cần phải get được `user Profile` -> `Username` là unique nên không thể nào có `username` trùng với nhau được -> Nếu khi mà người dùng muốn thay đổi username mà username đó đã có trong database rồi thì không cho phép thay đổi

### Follow User

- Khi mà `Follow` một ai đấy thì sẽ thêm `document` vào cái `collection` là `Follower` -> Sẽ không có `updated_at` trong document vì khi mà chúng ta hủy `Follow` thì chúng ta sẽ xóa cái `document` này đi

- Khi Follow ai thì gửi `user_id` của người đó lên -> Và phải `verify_email` rồi thì mới được `follow` người khác -> Và bắt thằng client nó gửi lên là `followed_user_id` cho chúng ta

- Check xem người đó có tồn tại không thì mới `follow` -> Chứ không tồn tại mà follow thì nó không đúng

GOOGLE_CLIENT_ID='902747943535-gogleqasrvg4ihh9f61dsfkrknns1jk0.apps.googleusercontent.com'
GOOGLE_CLIENT_SECRET='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'

### Unfollow User

- Trường hợp mà `unfollow` thì cũng check xem `followed_user_id` truyền vào có hợp lệ hay không

- middleware `verifiedUserValidator` thì cái middleware chỗ này để vào để check cho chắc ăn vì chưa `verify email` thì không thể nào `unfollow` user được

### Fix bug unique username

- Khi mà `updateMe` thì người dùng chỉ được cập nhật username khi mà `username` chưa có tồn tại trong database mà thôi -> Còn nếu mà đã cập nhật rồi thì không cho phép cập nhật -> Vậy thì chúng ta cần phải validate cho trường username trong updateMe

### Change Password

- Thực hiện change password cập nhật lại mật khẩu của người dùng

## OAuth 2.0

- Mặc dù là nói là flow của google nhưng nó vẫn áp dụng được với Facebook, github, twitter, ...

- Sau khi người dùng nhấn vào đăng nhập với google thì chúng ta sẽ Redirect người dùng về với đường `LINK`: `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?redirect_uri=http....` thì cái đường link kiểu này là do chúng ta `config` -> Và google nó sẽ xác thực những cái `query` mà chúng ta truyền vào nếu chúng ta truyền vào sai thì google nó không cho người dùng `đăng nhập` đâu -> Thì những cái query dựa trên những cái mà chúng ta vừa `create` lúc nảy như là `OAuth  consent screen` hay là `Crendentials`

- Khi mà người dùng mà chọn tài khoản và đăng nhập thành công thì thằng `google` sẽ redirect về cái API của chúng ta có dạng như sau `https://api.duthanhduoc.com/api.oauth/google?code=4%2F0A.....&scope` đi kèm với những cái `query` do `google` chèn vào, thì đây là những cái mà google nó tự sinh ra và nó gửi lại cho chúng ta

  - Thì khi mà google redirect cái đường link của chúng ta thì đó là một cái method `GET` thì server của chúng ta sẽ nhận được cái `code` `scope` do google cung cấp

  - Server sẽ nhận được cái `code` và tiến hành gọi lên google API để lấy thông tin `id_token` và `access_token`

  - Server sẽ lấy thông tin `id_token` và `access_token` để gọi Google API 1 lần nữa để lấy thông tin người dùng như `email`, `name`, `avatar`, ....

  - Sau khi đã có được email rồi thì sẽ tiến hành kiểm tra xem email này đã được đăng kí chưa -> Nếu chưa thì tạo mới user (mật khẩu cho random, sau này người dùng reset mật khẩu để đổi mật khẩu cũng được)

  - Tạo `access_token` và `refresh_token`

  - server redirect về `https://duthanhduoc.com/login?access_token=...&refresh_token=...` để gửi lại cho client -> Khi client nhận được cái URL này thì dùng useSearchParams để lấy ra các params `access_token` và `refresh_token`

  - Website của mình nhận được `access_token` và `refresh_token` qua query và tiến hành lưu vào local storage để sử dụng cho các request sau. Dùng cookie thì tại `bước 8` chúng ta sẽ redirect về `https://duthanhduoc.com/login` và set cookie tại đây

  - Thì thằng searchParams sẽ đọc và sửa đổi

  - Tiếp theo là tạo đường link cho thằng `Client` -> Để khi mà người dùng click vào cái Link này thì nó chuyển tới cái trang đăng nhập với `google`
    -> `https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow`

  - Những thứ cần có để có thể gửi cho Client đăng nhập bằng google

- Sau khi đã setup cho FE rồi tiếp theo chúng ta sẽ vào làm logic cho phần BE -> Phải khai báo các đường dẫn cho nó giống với cái mà chúng ta đã setup sẵn ở FE rồi -> Vì khi tiếp nhận thì server chúng ta cần phải có những cái `endpoint` như thế

- Đầu tiên phải lấy cái `code` từ `req.query` ra -> Sau đó gọi đến `userService` để xử lý

  - Sau khi nhận được code rồi thì server tiến hành gọi lên Google API để lấy thông tin về `id_token` và `access_token`

  - Cài đặt `axios` để gọi API từ Google API

  - Sẽ lấy `usename` và `email` từ người dùng bằng `id_token` và `access_token` còn khi nào người dùng muốn đăng nhập bằng mật khẩu thì cần phải `reset_password` lại -> Để người dùng muốn thì có thể login với `google` không thì phải nhập mật khẩu

  - Sau khi đã lấy được `username` , `email` và `avatar` -> Rồi chúng ta kiểm tra xem email google này của người dùng đã có trong database hay chưa -> Nếu chưa thì phải `random password` cho người dùng(người dùng có thể reset lấy lại mật khẩu sau).

  - Tạo `access_token` và `refresh_token` từ phía `server`

  - Server redirect về `https//localhost:3000/login/oauth?access_token=...refresh_token=...` để phía FE sẽ lấy được `access_token` và `refresh_token` và set vào `local-storage` của người dùng
