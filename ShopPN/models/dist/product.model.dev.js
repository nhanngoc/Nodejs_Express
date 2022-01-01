"use strict";

var db = require("../utils/db");

var tbl_products = "Sanpham";
module.exports = {
  all: function all() {
    return db.load("select *from ".concat(tbl_products));
  },
  seach_products: function seach_products() {
    return db.load("SELECT DISTINCT sp.*\n    FROM ((sanphamct ct INNER JOIN sanpham sp ON ct.masp = sp.MaSP) \n    INNER JOIN colors ON ct.color_id = colors.color_id \n    INNER JOIN sizes ON ct.size_id=sizes.size_id )");
  },
  //giam gia
  all_giamgia: function all_giamgia() {
    return db.load("select *from giamgia");
  },
  //cart//////////////
  single_cart: function single_cart(id, cl, si) {
    return db.load("\n    SELECT sp.*,colors.*,ct.* ,sizes.* \n    FROM ((sanphamct ct INNER JOIN sanpham sp ON ct.masp = sp.MaSP) \n    INNER JOIN colors ON ct.color_id = colors.color_id \n    INNER JOIN sizes ON ct.size_id=sizes.size_id ) \n    WHERE sp.MaSP = ".concat(id, " AND ct.color_id=").concat(cl, " AND ct.size_id=").concat(si));
  },
  //cart//////////////
  single_carts: function single_carts(id) {
    return db.load("SELECT ct.*,sp.*\n    FROM sanphamct ct INNER JOIN sanpham sp ON ct.masp=sp.MaSP\n    WHERE ct.sp_id=".concat(id, " "));
  },
  //detail start///
  detail_ct: function detail_ct(MaSP, color, size) {
    return db.load("SELECT sanpham.*,colors.*,sanphamct.* ,sizes.* \n    FROM ((sanphamct INNER JOIN sanpham ON sanphamct.masp = sanpham.MaSP) \n    INNER JOIN colors ON sanphamct.color_id = colors.color_id \n    INNER JOIN sizes ON sanphamct.size_id=sizes.size_id ) \n    WHERE sanphamct.masp=".concat(MaSP, " "));
  },
  detail_anh: function detail_anh(id) {
    return db.load("SELECT ct.*,sp.*\n    FROM sanpham sp JOIN anhct ct ON sp.MaSP=ct.MaSP\n    WHERE ct.MaSP=".concat(id));
  },
  //lọc color
  distinct_color: function distinct_color(id) {
    return db.load("SELECT DISTINCT colors.color_id,colors.color\n    FROM ((sanphamct INNER JOIN sanpham ON sanphamct.masp = sanpham.MaSP) \n    INNER JOIN colors ON sanphamct.color_id = colors.color_id ) \n    WHERE sanpham.MaSP=".concat(id));
  },
  //lọc size
  distinct_size: function distinct_size(id) {
    return db.load("SELECT DISTINCT sizes.* \n    FROM ((sanphamct INNER JOIN sanpham ON sanphamct.masp = sanpham.MaSP) \n    INNER JOIN sizes ON sanphamct.size_id = sizes.size_id ) \n    WHERE sanpham.MaSP=".concat(id));
  },
  //size
  detail_size: function detail_size(id) {
    return db.load("SELECT sizes.*,ct.color_id,ct.soluong\n    FROM ((sanphamct ct INNER JOIN sanpham sp ON ct.masp = sp.MaSP) \n    INNER JOIN sizes ON ct.size_id = sizes.size_id ) \n    WHERE sp.MaSP=".concat(id));
  },
  detail: function detail(id) {
    return db.load("select *from ".concat(tbl_products, " where MaSP =").concat(id));
  },
  //giam gia
  detail_gg: function detail_gg(id) {
    return db.load("select sanpham.*,giamgia.*\n    from sanpham INNER JOIN giamgia ON sanpham.MaSP=giamgia.makm\n    where MaSP =".concat(id));
  },
  //giam gai
  detail_ggg: function detail_ggg() {
    return db.load("select giamgia.* from giamgia");
  },
  size: function size() {
    return db.load("select * from sizes");
  },
  //detail end///

  /*  allByCat: function (maloai) {
    return db.load(`select *from ${tbl_products} where maloai =${maloai}`);
  }, */
  //loại danh mục sản phẩm
  pageByCat: function pageByCat(MaLoai, limit, offset) {
    return db.load("select *from ".concat(tbl_products, " where maloai =").concat(MaLoai, " limit ").concat(limit, " offset ").concat(offset));
  },
  //tất cả bé gái
  pageByCat_gai: function pageByCat_gai(limit, offset) {
    return db.load("select *\n      from ((loaisp INNER JOIN sanpham ON sanpham.MaLoai=loaisp.MaLoai)\n            INNER JOIN danhmuc ON loaisp.MaDM=danhmuc.MaDM)\n      where loaisp.MaDM=0 \n      order by sanpham.MaSP DESC \n      limit ".concat(limit, " offset ").concat(offset));
  },
  //tất cả bé trai
  pageByCat_trai: function pageByCat_trai(limit, offset) {
    return db.load("select *\n      from ((loaisp INNER JOIN sanpham ON sanpham.MaLoai=loaisp.MaLoai)\n            INNER JOIN danhmuc ON loaisp.MaDM=danhmuc.MaDM)\n      where loaisp.MaDM=1 \n      order by sanpham.MaSP DESC \n      limit ".concat(limit, " offset ").concat(offset));
  },
  // ten loai
  tenloai: function tenloai(maloai) {
    return db.load("select *from loaisp where MaLoai=".concat(maloai));
  },
  // ten loai danh muc
  all_dm: function all_dm() {
    return db.load("select *from danhmuc");
  },
  //new loại danh mục be gai
  pageloai0: function pageloai0(madm, limit, offset) {
    return db.load("select *\n      from ((loaisp INNER JOIN sanpham ON sanpham.MaLoai=loaisp.MaLoai)\n            INNER JOIN danhmuc ON loaisp.MaDM=danhmuc.MaDM)\n      where loaisp.MaDM=".concat(madm, " \n      order by sanpham.MaSP DESC\n      limit ").concat(limit, " offset ").concat(offset));
  },
  //sản phẩm mới
  allProduct: function allProduct(limit, offset) {
    return db.load("SELECT DISTINCT sp.*\n      FROM sanpham AS sp INNER JOIN sanphamct AS ct ON ct.masp=sp.MaSP \n      order by sp.MaSP DESC limit ".concat(limit, " offset ").concat(offset));
  },
  //sản phẩm giảm giá
  giam_gia: function giam_gia() {
    return db.load("select gg.*,sp.*\n      from giamgia gg INNER JOIN sanpham sp ON gg.makm=sp.MaSP\n      order by makm DESC");
  },
  //sản phẩm mới
  newProduct: function newProduct() {
    return db.load("SELECT DISTINCT sp.*\n      FROM sanpham AS sp INNER JOIN sanphamct AS ct ON ct.masp=sp.MaSP\n       order by sp.MaSP DESC limit 8 offset 0");
  },
  //phan trang
  pageByHome: function pageByHome(maloai, limit, offset) {
    return db.load("select *from ".concat(tbl_products, " limit ").concat(limit, " offset ").concat(offset));
  },

  /* countByCat: async function () {
    const rows = await db.load(`select count(*) as total from ${tbl_products}`);
    return rows[0].total;
  }, */
  countByCat: function countByCat() {
    return regeneratorRuntime.async(function countByCat$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", db.load("SELECT DISTINCT sp.*\n    FROM sanpham AS sp INNER JOIN sanphamct AS ct ON ct.masp=sp.MaSP \n    order by sp.MaSP"));

          case 1:
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
  },
  //All_sanpham_loai
  countByLoai0: function countByLoai0(madm) {
    var rows;
    return regeneratorRuntime.async(function countByLoai0$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(db.load("select count(*) as total \n      from ((loaisp INNER JOIN sanpham ON sanpham.MaLoai=loaisp.MaLoai)\n                  INNER JOIN danhmuc ON loaisp.MaDM=danhmuc.MaDM)\n            where loaisp.MaDM=".concat(madm)));

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
  //all_san pham loại bé gái
  countByLoai_gai: function countByLoai_gai() {
    var rows;
    return regeneratorRuntime.async(function countByLoai_gai$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(db.load("select count(*) as total \n      from ((loaisp INNER JOIN sanpham ON sanpham.MaLoai=loaisp.MaLoai)\n                  INNER JOIN danhmuc ON loaisp.MaDM=danhmuc.MaDM)\n            where loaisp.MaDM=0"));

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
  //all_san pham loại bé trai
  countByLoai_trai: function countByLoai_trai() {
    var rows;
    return regeneratorRuntime.async(function countByLoai_trai$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap(db.load("select count(*) as total \n      from ((loaisp INNER JOIN sanpham ON sanpham.MaLoai=loaisp.MaLoai)\n                  INNER JOIN danhmuc ON loaisp.MaDM=danhmuc.MaDM)\n            where loaisp.MaDM=1"));

          case 2:
            rows = _context5.sent;
            return _context5.abrupt("return", rows[0].total);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    });
  }
};