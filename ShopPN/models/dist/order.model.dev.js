"use strict";

var db = require("../utils/db");

var tbl_hoadon = "hoadon";
var tbl_chitiethd = "chitiethd";
module.exports = {
  all: function all() {
    return db.load("select *from ".concat(tbl_hoadon));
  },
  //them hoa don
  add_order: function add_order(entity) {
    return db.insert_hoadon(tbl_hoadon, entity);
  },
  // lấy id hoadon mới
  id_order: function id_order() {
    var rows;
    return regeneratorRuntime.async(function id_order$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(db.load("SELECT  mahd FROM ".concat(tbl_hoadon, " ORDER BY hoadon.mahd DESC LIMIT 1")));

          case 2:
            rows = _context.sent;
            return _context.abrupt("return", rows[0].mahd);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};