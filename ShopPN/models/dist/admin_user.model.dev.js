"use strict";

//const { delete } = require("../routes/category.route");
var db = require("../utils/db");

var tbl_tk = "tai_khoan";
var tbl_sp = "sanpham";
var tbl_loai = "Loaisp";
var tbl_khachhang = "khachhang";
var tbl_nhanvien = "nhanvien";
var data = [];
module.exports = {
  ////Start sản phẩm////
  // lấy danh sách sản phẩm
  all_products: function all_products() {
    return db.load("select *from ".concat(tbl_sp));
  },
  //them products
  add_pro: function add_pro(entity) {
    return db.insert_pro(tbl_sp, entity);
  },
  //remove products
  remove: function remove(id) {
    return db.load("delete from ".concat(tbl_sp, " where MaSP =").concat(id));
  },
  //sua products
  single: function single(id) {
    return db.load("select *from ".concat(tbl_sp, " where MaSP =").concat(id));
  },
  //capnhat products
  patch: function patch(entity) {
    var condition = {
      MaSP: entity.MaSP
    };
    delete entity.MaSP;
    return db.update_pro(tbl_sp, entity, condition);
  },
  //xoa products
  del: function del(id) {
    var condition = {
      MaSP: id
    };
    return db.delete_pro(tbl_sp, condition);
  },
  ////End sản phẩm////
  //// Start loại ////
  //lấy danh sách loại
  all_category: function all_category() {
    return db.load("select *from ".concat(tbl_loai));
  },
  //// End loại ////
  //// Start khách hàng ////
  // lấy danh sách khách hàng
  all_kh: function all_kh() {
    return db.load("select *from ".concat(tbl_khachhang));
  },
  //// End khách hàng ////
  //// Start Users////
  // lấy danh sách users từ table
  all_tk: function all_tk() {
    return db.load("SELECT nv.tennv, tk.username,tk.email,tk.MaQuyen FROM ".concat(tbl_nhanvien, " nv LEFT JOIN ").concat(tbl_tk, " tk ON nv.MaNV=tk.MaNV"));
  },
  //them username
  add_user: function add_user(entity) {
    return db.insert_tk(tbl_tk, entity);
  },
  //dung await phair dung async
  singleUserName: function singleUserName(username) {
    var rows;
    return regeneratorRuntime.async(function singleUserName$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(db.load("select * from ".concat(tbl_tk, " where username = '").concat(username, "'")));

          case 2:
            rows = _context.sent;

            if (!(rows.length === 0)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", null);

          case 5:
            return _context.abrupt("return", rows[0]);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    });
  } //// End Users////

};