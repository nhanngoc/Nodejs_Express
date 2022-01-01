"use strict";

/**
 * Created by trungquandev.com's author on 17/08/2019.
 * multipleUploadController.js
 */
var multipleUploadMiddleware = require("../middlewares/multipleUploadMiddleware");

var path = require("path");

var debug = console.log.bind(console);

exports.getHome = function (req, res) {
  return res.render('vwadmin/products/master', {
    layout: "admin"
  });
};

exports.multipleUpload = function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(multipleUploadMiddleware(req, res));

        case 3:
          // Nếu upload thành công, không lỗi thì tất cả các file của bạn sẽ được lưu trong biến req.files
          debug(req.files); // Mình kiểm tra thêm một bước nữa, nếu như không có file nào được gửi lên thì trả về thông báo cho client

          if (!(req.files.length <= 0)) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.send("You must select at least 1 file or more."));

        case 6:
          return _context.abrupt("return", res.send("Your files has been uploaded."));

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          // Nếu có lỗi thì debug lỗi xem là gì ở đây
          debug(_context.t0); // Bắt luôn lỗi vượt quá số lượng file cho phép tải lên trong 1 lần

          if (!(_context.t0.code === "LIMIT_UNEXPECTED_FILE")) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", res.send("Exceeds the number of files allowed to upload."));

        case 14:
          return _context.abrupt("return", res.send("Error when trying upload many files: ".concat(_context.t0, "}")));

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};