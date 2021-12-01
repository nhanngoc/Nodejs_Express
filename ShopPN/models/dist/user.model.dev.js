"use strict";

//const { delete } = require("../routes/category.route");
var db = require("../utils/db");

var tbl_Users = "khachhang";
var data = [];
module.exports = {
  //hàm lấy danh sách users từ table
  all: function all() {
    return db.load("select *from ".concat(tbl_Users));
  },
  //
  all_id: function all_id(MaKH) {
    return db.load("select *from ".concat(tbl_Users, " where MaKH =").concat(MaKH));
  },
  //them username khách hàng
  add_kh: function add_kh(entity) {
    return db.insert_kh(tbl_Users, entity);
  },
  //dung await phair dung async 
  singleUserName: function singleUserName(username) {
    var rows;
    return regeneratorRuntime.async(function singleUserName$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(db.load("select * from ".concat(tbl_Users, " where username = '").concat(username, "'")));

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
  },
  //sua
  single: function single(MaKH) {
    return db.load("select *from ".concat(tbl_Users, " where MaKH =").concat(MaKH));
  },
  //capnhat
  patch: function patch(entity) {
    var condition = {
      MaKH: entity.MaKH
    };
    delete entity.MaKH;
    return db.update_kh(tbl_Users, entity, condition);
  },
  //xoa
  del: function del(MaKH) {
    var condition = {
      MaKH: MaKH
    };
    return db.delete_kh(tbl_Users, condition);
  }
};