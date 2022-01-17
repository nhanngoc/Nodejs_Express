"use strict";

var _module$exports;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var db = require("../utils/db");

var tbl_hoadon = "hoadon";
var tbl_chitiethd = "chitiethd";
var tbl_spct = "sanphamct";
var tbl_kh = "khachhang";
module.exports = (_module$exports = {
  all: function all() {
    return db.load("select *from ".concat(tbl_hoadon));
  },
  //thông tin hóa đơn mới
  all_order: function all_order() {
    return db.load("select *from hoadon ORDER BY hoadon.mahd DESC LIMIT 1");
  },
  //thông tin bảng khách hàng
  all_khanhhang: function all_khanhhang() {
    return db.load("select *from khachhang");
  },
  //thông tin bảng khách hàng
  all_kh_makh: function all_kh_makh(makh) {
    return db.load("select *from khachhang WHERE MaKH=".concat(makh));
  },
  //sua thông tin tài khoản
  single_kh: function single_kh(makh) {
    return db.load("SELECT * FROM khachhang WHERE MaKH=".concat(makh));
  },
  //capnhat thông tin tài khoản
  update_khachhang: function update_khachhang(entity) {
    var condition = {
      MaKH: entity.MaKH
    };
    delete entity.MaKH;
    return db.update_kh(tbl_kh, entity, condition);
  },
  //thông tin hóa đơn theo mã khách hàng
  all_order_makh: function all_order_makh(makh) {
    return db.load("select *from hoadon WHERE makh=".concat(makh, "\n    ORDER BY hoadon.mahd DESC"));
  },
  //get choxacnhan hóa đơn theo mã khách hàng
  all_order_choxacnhan: function all_order_choxacnhan(makh) {
    return db.load("select *from hoadon WHERE makh=".concat(makh, " AND trangthai=\"Ch\u1EDD x\xE1c nh\u1EADn\"\n    ORDER BY hoadon.mahd DESC"));
  },
  total_choxacnhan: function total_choxacnhan(makh) {
    var rows;
    return regeneratorRuntime.async(function total_choxacnhan$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(db.load("select COUNT(*)AS total from hoadon WHERE makh=".concat(makh, " AND trangthai=\"Ch\u1EDD x\xE1c nh\u1EADn\"\n    ")));

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
  //get daxacnhan hóa đơn theo mã khách hàng
  all_order_daxacnhan: function all_order_daxacnhan(makh) {
    return db.load("select *from hoadon WHERE makh=".concat(makh, " AND trangthai=\"\u0110\xE3 x\xE1c nh\u1EADn\"\n    ORDER BY hoadon.mahd DESC"));
  },
  total_daxacnhan: function total_daxacnhan(makh) {
    var rows;
    return regeneratorRuntime.async(function total_daxacnhan$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(db.load("select COUNT(*)AS total from hoadon WHERE makh=".concat(makh, " AND trangthai=\"\u0110\xE3 x\xE1c nh\u1EADn\"\n    ")));

          case 2:
            rows = _context2.sent;
            return _context2.abrupt("return", rows[0].total);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  //get danggiao hóa đơn theo mã khách hàng
  all_order_danggiao: function all_order_danggiao(makh) {
    return db.load("select *from hoadon WHERE makh=".concat(makh, " AND trangthai=\"\u0110ang giao\"\n    ORDER BY hoadon.mahd DESC"));
  },
  total_danggiao: function total_danggiao(makh) {
    var rows;
    return regeneratorRuntime.async(function total_danggiao$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(db.load("select COUNT(*)AS total from hoadon WHERE makh=".concat(makh, " AND trangthai=\"\u0110ang giao\"\n    ")));

          case 2:
            rows = _context3.sent;
            return _context3.abrupt("return", rows[0].total);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  //get danhanhang hóa đơn theo mã khách hàng
  all_order_danhanhang: function all_order_danhanhang(makh) {
    return db.load("select *from hoadon WHERE makh=".concat(makh, " AND trangthai=\"\u0110\xE3 nh\u1EADn h\xE0ng\"\n    ORDER BY hoadon.mahd DESC"));
  },
  total_danhanhang: function total_danhanhang(makh) {
    var rows;
    return regeneratorRuntime.async(function total_danhanhang$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(db.load("select COUNT(*)AS total from hoadon WHERE makh=".concat(makh, " AND trangthai=\"\u0110\xE3 nh\u1EADn h\xE0ng\"\n    ")));

          case 2:
            rows = _context4.sent;
            return _context4.abrupt("return", rows[0].total);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  //get dahuy hóa đơn theo mã khách hàng
  all_order_dahuy: function all_order_dahuy(makh) {
    return db.load("select *from hoadon WHERE makh=".concat(makh, " AND trangthai=\"\u0110\xE3 h\u1EE7y\"\n    ORDER BY hoadon.mahd DESC"));
  },
  total_dahuy: function total_dahuy(makh) {
    var rows;
    return regeneratorRuntime.async(function total_dahuy$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap(db.load("select COUNT(*)AS total from hoadon WHERE makh=".concat(makh, " AND trangthai=\"\u0110\xE3 h\u1EE7y\"\n    ")));

          case 2:
            rows = _context5.sent;
            return _context5.abrupt("return", rows[0].total);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    });
  },
  //capnhat trang thai dahuy hoa don
  update_hd: function update_hd(entity) {
    var condition = {
      mahd: entity.mahd
    };
    delete entity.mahd;
    return db.update_hoadon(tbl_hoadon, entity, condition);
  },
  //laasy danh sach sanphamct
  all_spct: function all_spct() {
    return db.load("select *from ".concat(tbl_spct));
  },
  //chitiethd where mahd
  hd_id: function hd_id(id) {
    return db.load("select *from ".concat(tbl_chitiethd, " where mahd=").concat(id));
  },
  //capnhat sanphamct
  update_spct: function update_spct(entity) {
    var condition = {
      sp_id: entity.sp_id
    };
    delete entity.sp_id;
    return db.patch_spct(tbl_spct, entity, condition);
  },
  //thông tin chi tiết đơn hàng
  all_order_ct: function all_order_ct(mahd) {
    return db.load("SELECT ct.*, hd.*, sp.Anh,sp.TenSP,sp.Gia,sp.chatlieu\n    FROM ((chitiethd ct INNER JOIN hoadon hd ON ct.mahd=hd.mahd)\n        INNER JOIN sanpham sp ON ct.masp=sp.MaSP)\n    WHERE hd.mahd=".concat(mahd));
  },
  // lấy thông tin hóa đơn theo mã hóa đơn
  all_order_mahd: function all_order_mahd(mahd) {
    return db.load("SELECT * FROM hoadon WHERE hoadon.mahd=".concat(mahd));
  },
  //them hoa don
  add_order: function add_order(entity) {
    return db.insert_hoadon(tbl_hoadon, entity);
  },
  // lấy id hoadon mới
  id_order: function id_order() {
    var rows;
    return regeneratorRuntime.async(function id_order$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return regeneratorRuntime.awrap(db.load("SELECT  mahd FROM ".concat(tbl_hoadon, " ORDER BY hoadon.mahd DESC LIMIT 1")));

          case 2:
            rows = _context6.sent;
            return _context6.abrupt("return", rows[0].mahd);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    });
  }
}, _defineProperty(_module$exports, "all_spct", function all_spct() {
  return db.load("select *from ".concat(tbl_spct));
}), _defineProperty(_module$exports, "update_spct", function update_spct(entity) {
  var condition = {
    sp_id: entity.sp_id
  };
  delete entity.sp_id;
  return db.patch_spct(tbl_spct, entity, condition);
}), _module$exports);