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

> Khi chúng ta giao tiếp giữa client và server những cái kiểu ngày giờ như này -> thì chúng ta sẽ gửi lên `server` theo kiểu là `ISOString` có kiểu là `ISO8601`

> Do là khi gửi client gửi lên server kiểu ngày giờ là ISOString rồi thì khi ở trên server phải đổi lại thành kiểu là `Date` cho phù hợp với `schema User` mà chúng ta đã tạo ra cho thầng `date_of_birth` là kiểu `Date`

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

### Tạo Access Token và Refresh

- Muốn định nghĩa cho cái body của thằng Request ở mỗi cái function như `registerValidator` để nó trả về `reqBody` kiểu dữ liệu chho đúng -> Muốn định nghĩa kiểu dữ liệu cho thằng `body` trong `req.body`

- Bên `register.service`

- Cái `flow` của chúng ta là khi đăng kí thành công thì sẽ tạo ra `access_token` và `refresh_token`

- Cái `password` khi mà người dùng gửi lên thì chúng ta phải `hash` nó ra bằng thuật toán `Sha256` chứ không nên để nguyên `password` của người dùng như vậy rồi lưu vào `database` -> Muốn nguy hiểm hơn thì tạo thêm một cái `secret_key` để tăng độ bảo mật cho `password` của người dùng

- Vì cái class User chúng ta đã khai báo -> Nếu mà có truyền lên `database` dữ liệu thì thằng `constructor` trong class User nó chỉ lấy những dữ liệu cần thiết mà thôi -> Nên cái object tạo ra từ `new User` ở trong hàm `register` của `register.services` nó chỉ có những data cần thiết cho thằng `MongoDB` mà thôi nó không có bị dư cái trường `comfirm_password`

- Lên `jwt doc` xem cách nó tạo ra chữ kí như thế nào -> Chúng ta sẽ tạo cái `sign` bằng `bất đồng bộ` Và chuyển nó thằng một `Promise` chứ không để `callback` như nó

- Khai báo một private method ở bên trong usersService đó là `signAccessToken` và `signRefreshToken`

- Sẽ quy định một cái `token_type` cho mỗi cái `token` bên trong dữ liệu của chúng ta

- Sau khi `insert` 1 người dùng vào database thì cái `result` nó trả về cho chúng ta một cái `insertedId` -> Thì đây chính là `id` của `user`

- Vì 2 thằng `access_token` và `refresh_token` là 2 hàm bất đồng bộ và không có ảnh hưởng gì đến nhau -> Nên là chúng ta có thể sử dụng `Promise.all` để mà tối ưu cái `performance` của chúng ta -> Vì nếu chúng ta làm tuần tự thì cái `performance` sao mà bằng việc chúng ta làm bất đồng bộ được.

- Tạm thời trả về cho người dùng access_token và refresh_token, còn cái `send email` để `verify` khi đăng kí thì để sau

- Mặc định khi mà access_token và refresh_token trả về thì nó sẽ không có `expiresIn` `exp` -> Nên là chúng ta cần quy định thời gian hết hạn vào cho nó

  - `expiresIn` của access_token nó nằm trong params `options` của `jwt.sign`
  - Mặc định giá trị của `expiresIn` là `giây` còn nếu thêm `""` vào thì `2 days` là 2 ngày , `10h` là 10 giờ, `7d` là 7 ngày
  - Còn nếu điền là `string` mà không có ghi chữ gì phía sau thì nó sẽ hiểu là `mili giây` ví dụ như `120` nghĩa là `120 mili giây`

  - Thì cái thằng `expiresIn` nó sử dụng tiêu chuẩn của thằng `vercel/ms`

> Sử dụng jwt để sign token và sử dụng bất đồng bộ để tối ưu performance thay vì sử dụng đồng bộ để sign access_token rồi mới tới sign refresh_token(vì cái callback nó khá khó để handle với việc sign access_token và refresh_token) thay vào đó thì sign access_token và refresh_token cùng một lúc.

### Error handle trong Express.js

- `Error handle` là tính năng rất là quan trọng trong bất kì cái framework nào -> Giúp chúng ta xử lý lỗi trong ứng dụng

- Người dùng nhập liệu sai thì chúng ta trả về lỗi, server vì lí do nào đấy mà nó bị lỗi thì chúng ta cũng phải trả về lỗi

- Cái Typescript chỉ có nhiệm vụ là biên dịch code mà thôi chứ nó không có check lỗi `khi built` nữa -> Nên là thêm `-T` vào trong source `nodemon.json` để mà tắt cái lỗi đi khi mà `built code` -> Tắt chế độ check lỗi -> `ts-node` ngoài biên dịch TS nó còn kiểm tra kiểu dữ liệu nữa -> Nên muốn nó chỉ biên dịch thôi không muốn nó kiểm tra kiễu dữ liệu thì thêm `-T` vào hoặc có thể là `--transpileOnly`

- Nếu là `error handler` thì phải khai báo đủ 4 tham số là `err req res next` nếu khai báo thiếu một tham số thì nó sẽ tưởng đó là `request handler` -> Nên là phải rất là cẩn thận

- Nếu mà async callback mà khi có lỗi chúng ta không `next(err)` cho nó thì khi đó nó sẽ bị `crash app` -> Nên là khi sử dụng `async callback` dù thế nào đi nữa thì cũng phải `next(err)` cho nó, sử dung thêm `try-catch` để bắt lỗi cho nó nên là khi vào `catch` thì phải `next(err)` cho nó

### Tạo wrapRequestHandler để xử lý lỗi

- xử lý lỗi tập trung -> Khi mà có lỗi từ phía controller thì chúng ta sẽ đẩy lỗi về phía `lỗi tập trung` để xử lý -> Thì những cái lỗi nên chuyền về `error handler` để nó tập trung nó xử lý lỗi

- Khai báo `error handler` `middleware` để xử lý lỗi cho cả cái `app` của chúng ta luôn

- Không lẽ bây giờ thằng `Controller` nào chúng ta cũng `try catch` nó hết -> Nên là chúng ta sẽ tạo thêm một `hàm` bọc bên ngoài để lo việc `try-catch` cho thằng `Controller` và xử lý `lỗi` tập trung

- Khi gọi thằng `wrapRequestHandler` thì nó vẫn trả về cho chúng ta một `RequestHandler`

- `Promise.resolve(func(req, res, next)).catch(next)` -> khi mà cái funtion bên trong nó bị lỗi thì chúng ta không quan trọng nó lỗi `promise.reject` hay là lỗi function bình thường -> Chỉ cần bên trng `func` thì cái `Promise` đó nó sẽ `reject` cho chúng ta -> Mà `reject` thì nó sẽ nhảy vào cái `catch` -> nhảy vào `catch()` rồi thì chúng ta sẽ `next()` nó tới cái xử lý lỗi trung tâm

  - Nhưng mà nếu dùng `Promise.resolve(func(req,res, next)).catch(next)` thì cái `func` phải là `async func` thì khi có lỗi thì nó sẽ nhảy vào lỗi cho chúng ta -> Còn nếu là `func` bình thường thì khi có lỗi nó sẽ không ra lỗi mà còn `crash` cả ứng dụng

  - Vậy là chúng ta không thể `throw` một cái `error` trong `Promise.resolve()` được -> Nên là chúng ta sẽ sử dụng `try-catch` để bắt lỗi

  - Sử dụng `try-catch` toàn năng hơn cho cả `function thường` và `async function`, còn cách `Promise.resolve(func(req, res, next)).catch(next)` chỉ dùng cho `func async` mà thôi

- Lỗi sử lý tập trung nó vẫn chưa tối ưu lắm -> Nên là qua các bài sau chúng ta sẽ tối ưu dần

### Chuẩn hoá bộ xử lý lỗi

- Thiết kế hệ thống xử lý lỗi cho nó tường minh và rõ ràng hơn

- Trong cái `checkSchema` có một vài trường hợp là chúng ta sẽ cho ra lỗi `422` là lỗi `validate` có một vài trường hợp thì sẽ không ra lỗi `422` ví dụ chúng ta kiểm tra token của người ta -> Người ta gửi `token invalid` lên thì chúng ta sẽ trả về lỗi `401`

- Thông thường khi mà kiểm tra lỗi `validate` thì trả về `422` là đúng rồi -> Nhưng mà khi chúng ta tìm không ra cái `email`(hoặc là cái email đăng kí đã tồn tại rồi) của `user` thì làm thế nào để nó nhận biết được và trả về lỗi `401`

- Thì cái thằng error.mapped nó trả về một cái `object` thì chúng ta sẽ lập qua cái object đó -> Nếu như mà cái message nào có cái status nó khác với `422` thì sẽ cho trả về cái `error` có `msg` là một object như sau `{message: "Email already exists", status: 401}` -> Còn bình thường thì sẽ cho trả về cái `error` là `422`

- Thì để xử lý lỗi tốt thì chúng ta cần phải thống nhất cách xử lý lỗi với người dùng -> Cần có cái format xử lý lỗi chuẩn chỉnh

  - Ví dụ như lỗi thông thường thì chúng ta chỉ cần trả về

    - ```ts
      message: string
      error_info?: any // thông tin lỗi  đó nếu có
      ```

  - Còn với lỗi 422 thì sẽ có format như sau:

    - ```ts
      message: string
      error: {
        [field: string]: {
          msg: string,
          location: string,
          value: any
        }
      }
      ```

  - `msg` chỉ nên là `string` không nên là một cái `object` như sau:

    - msg: {
      'message': 'Email already exits',
      'status': 401
      }
      -> Không nên là một cái object như thế này

  - Thì format lỗi như này thì khá là chuẩn rồi

- Để mà thiết kế cho chuẩn thì chúng ta sẽ tạo một cái `class` -> Để mỗi lần `throw` một object `error` thì nó sẽ chuẩn hơn.

- Bình thường khi mà tạo một cái ErrorWithStatus thì sẽ cho nó kế thừa `stackTrace`(lỗi tại dòng nào) của `Error` nhưng ở đây chúng ta sẽ không kế thừa -> Chút nữa chúng ta sẽ biết lí do vì sao

- Nếu mà chúng ta `ErrorWithStatus extends Error` thì thằng `express-validator` nó thấy chúng ta throw một cái `object` mà thz này `extends` từ `Error object` thì nó chỉ nhận mỗi `message` của cái `object` này thôi, còn cái `status` nó sẽ bỏ đi để thu ngọn lại cái `object` -> Thì đó là lí do chúng ta không `extends Error` mặc định của trình duyệt, dùng thì nó sẽ hay hơn nhưng mà khi dùng thì nó sẽ vướn thằng `express-validator`

- Tất cả `Error` thì chúng ta sẽ đưa `Default Error Handler` trả về

- Chúng ta mong muốn là khi có lỗi trả về thì mong muốn có một cái `object Error` có chứa `status` bên trong để mà chúng tá biết đường `response` cái `status` về cho người dùng

- Chúng ta sẽ xây dựng `middlewares Error` chuẩn chỉnh để trả về cho người dùng -> Phần này cũng hơi khó một tí, nhưng mà cố gắng thì vẫn có thể học

- Chúng ta muốn `EntityError` nó có một khuôn mẫu nhất định thì chúng ta cần phải định nghĩa cho nó -> để khi mà nó trả ra lỗi thì nó sẽ chính xác hơn

  - `location`: là nó nằm trong cái thành phần nào gửi lên API , nằm trong `body` hay nằm ở `query`.
  - `path`: là để tham chiếu rằng là nó đang ở cái field nào

- Chúng ta không phải lúc nào cũng cố định có `location` và `value` được

- bởi vì cái `nestedErrors` ở trong `AlternativeValidator` nó có kiểu là `FieldValidatorError[]` thì kiểu gì thì kiểu nó cũng sẽ có cái `value`

- Ở người dùng người ta chỉ cần lấy ra cái `[field: string]` và cái `msg: lỗi` mà thôi

### Khai báo Message Validation

- Khai báo một Message Validation

- Cái `Error` trả về lúc nào cũng là `Invalid Value` -> Chúng ta mong muốn là cái `Error Message` nó tường mình hơn

- Nên trả về cái message cho giá trị trong body từ client gửi lên để khi có lỗi thì nó sẽ show ra lỗi cho chúng ta để chúng ta có thể fix được lỗi

### Xử lý logic Login

- Xử lý logic cho phần `login` -> Logic khá hay nên là phải tập trung nhiều hơn

- Ở đây có một cái mẹo là không cần phải `check` `notEmpty` ở thằng `email` vì khi người dùng không truyền `email` lên thì nó vẫn chạy vào cái `isEmail` -> Một cái mẹo nhỏ có thể xoá được cái `prop` `notEmpty` một cách an toàn -> Để lại thì nó sẽ chặt chẽ cái `validate` hơn

- Trước khi đăng nhập thì chúng ta phải kiểm tra xem `email` và `password` có tồn tại trong cơ sở dữ liệu hay không

- Login thì chúng ta cần tạo `access_token` và `refresh_token` -> Mà tạo 2 thằng này thì chúng ta cần phải có `user_id` -> Chúng ta có thể lấy được cái `user_id` bằng cách `users.findOne({email: value})` khi mà người dùng nhập email vào

- Cái `checkIsMailExist` chúng ta đã `findOne` một lần rồi mà qua `logic login` chúng ta lại find thêm lần nữa -> Nó làm cho cái `Response` của chúng ta nó bị lâu đi -> Nó sẽ làm giảm `performance` ứng dụng của chúng ta

- Mình sẽ chuyền cái `user` từ `users.middlewares` qua bên hàm login của `users.services` bằng cách nào -> Thì bằng cách sử dụng `req` ở hai bên -> ở `users.middlewares` thì chúng ta sẽ `req.user = user`

- Và khi có lỗi 500 vẫn chưa có `message` lỗi gì cả, vì khi có lỗi thì phải trả lỗi về cho người dùng có lẫn `message` -> Nên ở đây cái hệ thống xử lý lỗi của chúng ta nó vẫn chưa có ổn -> Nên là chúng ta sẽ custom lại cái lỗi này sao cho `chuẩn chỉnh` nhất dể có thể `handle` hết các lỗi trả về cho phía `Client`

- Cái `Error` của chúng ta chính là cái `error object` chúng ta thấy nó có dầy đủ cái `stack trace`(thông tin lỗi) -> Nó không trả về cho chúng ta khi mà chúng ta `clg` cái `err` ra là do cái `object error` này nó hơi `đặc biệt` một xíu -> Mặc dù cái `error` chúng ta gửi về có cái `stack trace và message` nhưng mà khi chúng ta `JSON.stringify(err)` thì nó trả về cái `object` rỗng

- `Object.getOwnPropertyDescriptor(err, 'message')` thì nó sẽ cho ra cái thông tin `message` ở bên trong cái `object error` -> thì thằng này nó có một thuộc tính là `enumerable` nó sẽ quyết định là cái `message` nó sẽ xuất hiện không khi mà chúng ta sử dụng `JSON.stringify` hay không -> Kiểu như này như là thông tin của một cái thuộc tính của một `object` -> Nó có một số thuộc tính của cái `object` như `configurable`, `enumerable`, `writable` -> `Enumerable` thì có dùng cái `Object.keys(err)` thì nó cũng sẽ không xuất hiện cái `message lỗi` - muốn cho nó xuất hiện `message lỗi` thì phải set cái `enumerable: true`

  - Có thể defineProperty để lấy set giá trị cho `enumerable` là `true`

- Nếu không phải là `ErrorWithStatus` thì nó là lỗi do `SERVER` -> Và Chúng ta vẫn muốn lỗi do `server` vẫn có một cái `message`

  - Vì cái `err` ở trong `errorInfo` nó trả về cho chúng ta một cái `object rỗng` nên là chúng ta sẽ phải xử lý nó ở đây để nó trả về cho chúng ta một cái `object` có giá trị

- Đầu tiên làm sao để biết được cái thằng `error trong đefaultError` có bao nhiêu cái thuộc tính`(ban đầu thì cái enumerable là false nên là chúng ta không thể lặp qua object Error được)` thì có thể dùng `getOwnPropertyNames()` để lấy ra cái `keys` của `error` cho dù có `enumerable: false` thì vẫn `lấy ra được` cái `key` của `error` và để dưới dạng là một `array - key[]`

  - Mặc dù là môi trường trình duyệt `chrome` và môi trường `Nodejs` nhưng mà đây là `tiêu chuẩn javascript` nên là 2 thằng vẫn giống như nhau

  - Môi trường `dev` thì có thể để `stack trace` nhưng trên môi trường `production` thì nó nhạy cảm quá -> Nên là chúng ta có thể xoá cái `stack trace` đó đi

- Để mở rộng kiểu dữ liệu của thằng `express` thì chúng ta khai báo nó bên trong file `type.d.ts`

  - `user?: User` bởi vì đâu phải lúc nào cái `Request` của chúng ta nó cũng có `User` đâu nên là chúng ta `overwrite` `user: User` như vậy thì nó không đúng nữa nên là phải thêm `? optional` vào

### Cập nhật logic Login và config env

- Cập nhật lại `logic` cho thằng `login` và `register` là thêm `refresh_token` vào database mỗi khi thực hiện `request` thành công

### Access Token middleware cho Logout

### Refresh Token middleware và Logout logic

### Xử lý route /users/refresh-token
