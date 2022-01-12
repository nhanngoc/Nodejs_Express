"use strict";

var Model = require("../models/admin_user.model");

var express = require("express");

var db = require("../utils/db");

var router = express.Router();

var restrict = require("../middlewares/auth.mdw");

router.get("/products/add", restrict.admin, function _callee(req, res) {
  var list;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Model.all_category());

        case 2:
          list = _context.sent;
          res.render("vwadmin/products/add", {
            layout: "admin",
            loaisp: list
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}); //thêm sản phẩm mới

router.post("/products/add", function _callee4(req, res, next) {
  var list, today, date, post, maloai, ten, gia, mota, chatlieu, ngaynhap, file, mutilfile, img_name;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Model.all_category());

        case 2:
          list = _context4.sent;
          message = "";
          today = new Date();
          date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
          post = req.body;
          maloai = post.MaLoai;
          ten = post.TenSP;
          gia = post.Gia;
          mota = post.MoTa;
          chatlieu = post.chatlieu;
          ngaynhap = date;
          /* if (!req.files)
              return res.status(400).send("Không có tệp nào được tải lên.");
          */

          if (req.files) {
            _context4.next = 15;
            break;
          }

          return _context4.abrupt("return", res.render("vwadmin/products/add", {
            err: "Không có tệp nào được tải lên.",
            layout: "admin",
            loaisp: list
          }));

        case 15:
          file = req.files.uploaded_image;
          mutilfile = req.files.many_files;
          img_name = file.name;

          if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {
            mutilfile.map(function (item, index) {
              item.mv("public/images/detail/" + item.name, function _callee2(err) {
                return regeneratorRuntime.async(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        console.log("Lưu nhiều hình ảnh thành công", item);

                      case 1:
                      case "end":
                        return _context2.stop();
                    }
                  }
                });
              });
            });
            file.mv("public/images/" + file.name, function _callee3(err) {
              var entity, idsp, arrlist, i, MaSP, anh_ten, arr;
              return regeneratorRuntime.async(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      if (!err) {
                        _context3.next = 2;
                        break;
                      }

                      return _context3.abrupt("return", res.status(500).send(err));

                    case 2:
                      entity = {
                        MaLoai: maloai,
                        TenSP: ten,
                        Anh: img_name,
                        Gia: gia,
                        MoTa: mota,
                        chatlieu: chatlieu,
                        ngaynhap: ngaynhap
                      };
                      _context3.next = 5;
                      return regeneratorRuntime.awrap(Model.add_pro(entity));

                    case 5:
                      _context3.next = 7;
                      return regeneratorRuntime.awrap(Model.id_sp());

                    case 7:
                      idsp = _context3.sent;
                      arrlist = [];

                      for (i = 0; i < mutilfile.length; i++) {
                        MaSP = idsp;
                        anh_ten = mutilfile[i].name;
                        arr = [MaSP, anh_ten];
                        arrlist.push(arr);
                      }

                      console.log("arrlist:", arrlist);
                      _context3.next = 13;
                      return regeneratorRuntime.awrap(db.insert_mutilfile(arrlist));

                    case 13:
                      res.redirect("/admin/products/add");

                    case 14:
                    case "end":
                      return _context3.stop();
                  }
                }
              });
            });
          } else {
            message = "Định dạng này không được phép,vui lòng tải lên '.png','.gif','.jpg'";
            res.render("vwadmin/products/add", {
              message: message,
              layout: "admin",
              loaisp: list
            });
          }

        case 19:
        case "end":
          return _context4.stop();
      }
    }
  });
});
module.exports = router;