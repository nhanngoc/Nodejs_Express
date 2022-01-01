"use strict";

/**
 * Created by trungquandev.com's author on 17/08/2019.
 * multipleUploadMiddleware.js
 */
var util = require("util");

var path = require("path");

var multer = require("multer"); // Khởi tạo biến cấu hình cho việc lưu trữ file upload


var storage = multer.diskStorage({
  // Định nghĩa nơi file upload sẽ được lưu lại
  destination: function destination(req, file, callback) {
    callback(null, path.join("".concat(__dirname, "/../public")));
  },
  filename: function filename(req, file, callback) {
    // ở đây các bạn có thể làm bất kỳ điều gì với cái file nhé.
    // Mình ví dụ chỉ cho phép tải lên các loại ảnh png & jpg
    var math = ["image/png", "image/jpeg", "image/jpg"];

    if (math.indexOf(file.mimetype) === -1) {
      var errorMess = "The file <strong>".concat(file.originalname, "</strong> is invalid. Only allowed to upload image jpeg or png.");
      return callback(errorMess, null);
    } // Tên của file thì mình nối thêm một cái nhãn thời gian để tránh bị trùng tên file.


    var filename = "".concat(Date.now(), "-nhan-").concat(file.originalname);
    callback(null, filename);
  }
}); // Khởi tạo middleware uploadManyFiles với cấu hình như ở trên,
// Bên trong hàm .array() truyền vào name của thẻ input, ở đây mình đặt là "many-files", và tham số thứ hai là giới hạn số file được phép upload mỗi lần, mình sẽ để là 17 (con số mà mình yêu thích). Các bạn thích để bao nhiêu cũng được.

var uploadManyFiles = multer({
  storage: storage
}).array("many_files", 17); // Mục đích của util.promisify() là để bên controller có thể dùng async-await để gọi tới middleware này

var multipleUploadMiddleware = util.promisify(uploadManyFiles);
module.exports = multipleUploadMiddleware;