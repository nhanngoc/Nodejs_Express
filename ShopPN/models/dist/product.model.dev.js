"use strict";

var db = require("../utils/db");

var tbl_products = "Sanpham";
module.exports = {
  all: function all() {
    return db.load("select *from ".concat(tbl_products));
  },
  allByCat: function allByCat(maloai) {
    return db.load("select *from ".concat(tbl_products, " where maloai =").concat(maloai));
  },
  //hãng sản phẩm
  pageByCat: function pageByCat(MaLoai, limit, offset) {
    return db.load("select *from ".concat(tbl_products, " where maloai =").concat(MaLoai, " limit ").concat(limit, " offset ").concat(offset));
  },
  //phan trang
  pageByHome: function pageByHome(maloai, limit, offset) {
    return db.load("select *from ".concat(tbl_products, " limit ").concat(limit, " offset ").concat(offset));
  },
  countByCat: function countByCat() {
    var rows;
    return regeneratorRuntime.async(function countByCat$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(db.load("select count(*) as total from ".concat(tbl_products)));

          case 2:
            rows = _context.sent;
            return _context.abrupt("return", rows[0].total);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  //phan trang
  pageHome: function pageHome(limit, offset) {
    return db.load("select *from ".concat(tbl_products, " limit ").concat(limit, " offset ").concat(offset));
  }
};