"use strict";

var db = require("../utils/db");

var tbl_products = "Sanpham";
module.exports = {
  all: function all() {
    return db.load("select *from ".concat(tbl_products));
  },
  //cart//////////////
  single_cart: function single_cart(id) {
    return db.load("select *from ".concat(tbl_products, " where MaSP =").concat(id));
  },
  //cart//////////////
  single_carts: function single_carts(id) {
    return db.load("SELECT ct.*,sp.*\n    FROM sanphamct ct INNER JOIN sanpham sp ON ct.masp=sp.MaSP\n    WHERE ct.sp_id=".concat(id, " "));
  },
  single_cc: function single_cc(id) {
    return db.load(" ");
  },
  //detail
  detail_ct: function detail_ct(MaSP, color, size) {
    return db.load("SELECT sanpham.*,colors.*,sanphamct.* ,sizes.* \n    FROM ((sanphamct INNER JOIN sanpham ON sanphamct.masp = sanpham.MaSP) \n    INNER JOIN colors ON sanphamct.color_id = colors.color_id \n    INNER JOIN sizes ON sanphamct.size_id=sizes.size_id ) \n    WHERE sanphamct.masp=".concat(MaSP, " "));
  },
  //lọc color
  detail_color: function detail_color(id) {
    return db.load("SELECT DISTINCT colors.color_id,colors.color\n    FROM ((sanphamct INNER JOIN sanpham ON sanphamct.masp = sanpham.MaSP) \n    INNER JOIN colors ON sanphamct.color_id = colors.color_id ) \n    WHERE sanphamct.masp=".concat(id));
  },
  //lọc size
  detail_size: function detail_size(id) {
    return db.load("select *from ".concat(tbl_products, " where MaSP =").concat(id));
  },
  detail: function detail(id) {
    return db.load("select *from ".concat(tbl_products, " where MaSP =").concat(id));
  },

  /*  allByCat: function (maloai) {
    return db.load(`select *from ${tbl_products} where maloai =${maloai}`);
  }, */
  //loại danh mục sản phẩm
  pageByCat: function pageByCat(MaLoai, limit, offset) {
    return db.load("select *from ".concat(tbl_products, " where maloai =").concat(MaLoai, " limit ").concat(limit, " offset ").concat(offset));
  },
  //sản phẩm mới
  newProduct: function newProduct(limit, offset) {
    return db.load("select *from ".concat(tbl_products, " order by MaSP DESC limit ").concat(limit, " offset ").concat(offset));
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
  countByLoai: function countByLoai(MaLoai) {
    var rows;
    return regeneratorRuntime.async(function countByLoai$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(db.load("select count(*) as total from ".concat(tbl_products, " where maloai =").concat(MaLoai)));

          case 2:
            rows = _context2.sent;
            return _context2.abrupt("return", rows[0].total);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};