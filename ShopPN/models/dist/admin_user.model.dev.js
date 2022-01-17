"use strict";

//const { delete } = require("../routes/category.route");
var db = require("../utils/db");

var tbl_sp = "sanpham";
var tbl_gg = "giamgia";
var tbl_spct = "sanphamct";
var tbl_loai = "loaisp";
var tbl_khachhang = "khachhang";
var tbl_hoadon = "hoadon";
var tbl_chitiethd = "chitiethd";
var tbl_quantri = "quantri";
var data = [];
module.exports = {
  ////Start sản phẩm////
  // lấy danh sách sản phẩm
  all_products: function all_products() {
    return db.load("select *from ".concat(tbl_sp));
  },
  //ds sản phẩm chưa có thuộc tính
  _products: function _products() {
    return db.load("SELECT sp.*, ct.*\n    FROM sanpham AS sp LEFT JOIN sanphamct AS ct ON ct.masp=sp.MaSP\n    WHERE ct.sp_id IS NULL ");
  },
  //ds sản phẩm có thuộc tính
  //
  attr_products: function attr_products() {
    return db.load("SELECT DISTINCT sp.*\n    FROM sanpham AS sp INNER JOIN sanphamct AS ct ON ct.masp=sp.MaSP order by sp.MaSP DESC");
  },
  //ds màu và masp
  distinct_colors: function distinct_colors() {
    return db.load("SELECT DISTINCT cl.*,ct.masp\n    FROM sanphamct AS ct INNER JOIN colors AS cl ON ct.color_id=cl.color_id");
  },
  //ds size, color_id và masp
  distinct_sizes: function distinct_sizes() {
    return db.load("SELECT sz.*,ct.masp,ct.color_id,ct.soluong\n    FROM sanphamct AS ct INNER JOIN sizes AS sz ON ct.size_id=sz.size_id");
  },
  //danh sách màu
  attr_colors: function attr_colors() {
    return db.load("select * from colors");
  },
  //danh sách size
  attr_sizes: function attr_sizes() {
    return db.load("select * from sizes");
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
  //them products
  add_pro: function add_pro(entity) {
    return db.insert_pro(tbl_sp, entity);
  },
  // lấy id sản phẩm
  id_sp: function id_sp() {
    var rows;
    return regeneratorRuntime.async(function id_sp$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(db.load("SELECT  MaSP FROM ".concat(tbl_sp, " ORDER BY sanpham.MaSP DESC LIMIT 1")));

          case 2:
            rows = _context.sent;
            return _context.abrupt("return", rows[0].MaSP);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  //remove products attribute
  remove_attr: function remove_attr(id) {
    return db.load("delete from ".concat(tbl_spct, " where MaSP =").concat(id));
  },
  //remove attr detail
  remove_attr_detail: function remove_attr_detail(id) {
    return db.load("delete from ".concat(tbl_spct, " where sp_id =").concat(id));
  },
  //remove products
  remove_pro: function remove_pro(id) {
    return db.load("delete from ".concat(tbl_sp, " where MaSP =").concat(id));
  },
  //remove anhct
  remove_anhct: function remove_anhct(id) {
    return db.load("delete from anhct where MaSP =".concat(id));
  },
  //sua products
  single_pro: function single_pro(id) {
    return db.load("select *from ".concat(tbl_sp, " where MaSP =").concat(id));
  },
  //sua products attribute
  single_attr_ct: function single_attr_ct(id) {
    return db.load("SELECT ct.sp_id,ct.masp,ct.soluong,cl.*,si.* \n    FROM ((sanphamct ct INNER JOIN colors cl ON ct.color_id = cl.color_id) \n    INNER JOIN sizes si ON ct.size_id=si.size_id )\n    WHERE ct.masp=".concat(id));
  },
  //sua products attribute detail
  single_attr_detail: function single_attr_detail(id) {
    return db.load("SELECT ct.sp_id,ct.masp,ct.soluong,cl.*,si.* \n    FROM ((sanphamct ct INNER JOIN colors cl ON ct.color_id = cl.color_id) \n    INNER JOIN sizes si ON ct.size_id=si.size_id )\n    WHERE ct.sp_id=".concat(id));
  },
  //sua products attribute detail
  sizes_list: function sizes_list(id) {
    return db.load("SELECT * FROM sizes");
  },
  //capnhat products attribute detail
  patch_attr_detail: function patch_attr_detail(entity) {
    var condition = {
      sp_id: entity.sp_id
    };
    delete entity.sp_id;
    return db.update_attr_detail(tbl_spct, entity, condition);
  },
  //capnhat products attribute
  patch_attr: function patch_attr(entity) {
    var condition = {
      MaSP: entity.MaSP
    };
    delete entity.MaSP;
    return db.update_attr(tbl_sp, entity, condition);
  },
  //capnhat products
  patch_pro: function patch_pro(entity) {
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
  //lấy danh giảm giá
  all_gg: function all_gg() {
    return db.load("select gg.*,sp.TenSP,sp.Anh,sp.Gia from giamgia gg \n    INNER JOIN sanpham sp ON gg.makm=sp.MaSP");
  },
  //all sản phẩm chưa khuyến mãi
  all_sp_gg: function all_sp_gg() {
    return db.load("SELECT sp.*\n    FROM sanpham sp LEFT JOIN giamgia gg ON gg.makm=sp.MaSP\n    WHERE gg.makm IS NULL\n    order by sp.MaSP DESC");
  },
  //all sản phẩm chưa khuyến mãi
  id_sp_gg: function id_sp_gg(id) {
    return db.load("SELECT * FROM sanpham WHERE MaSP=".concat(id));
  },
  //Thêm mới giảm giá
  add_gg: function add_gg(entity) {
    return db.insert_gg(tbl_gg, entity);
  },
  //sua
  single_gg: function single_gg(id) {
    return db.load("select gg.*,sp.* from giamgia gg \n    INNER JOIN sanpham sp ON gg.makm=sp.MaSP where makm =".concat(id));
  },
  //capnhat
  update_gg: function update_gg(entity) {
    var condition = {
      makm: entity.makm
    };
    delete entity.makm;
    return db.patch_gg(tbl_gg, entity, condition);
  },
  //xoa
  remove_gg: function remove_gg(id) {
    return db.load("delete from giamgia where makm=".concat(id));
  },
  ////End sản phẩm////
  //// Start loại ////
  //lấy danh sách loại
  distinct_category: function distinct_category() {
    return db.load("SELECT DISTINCT sanpham.MaLoai FROM sanpham");
  },
  all_category: function all_category() {
    return db.load("SELECT * FROM ".concat(tbl_loai, " WHERE loaisp.MaDM IN(0,1)"));
  },
  //lấy danh sách danh mục
  all_dm: function all_dm() {
    return db.load("SELECT * FROM danhmuc WHERE MaDM IN(0,1)");
  },
  //Thêm mới loại
  add_loai: function add_loai(entity) {
    return db.insert_loai(tbl_loai, entity);
  },
  //sua
  single_loai: function single_loai(id) {
    return db.load("SELECT * FROM ".concat(tbl_loai, " WHERE MaLoai=").concat(id));
  },
  //capnhat
  update_loai: function update_loai(entity) {
    var condition = {
      MaLoai: entity.MaLoai
    };
    delete entity.MaLoai;
    return db.update_loai(tbl_loai, entity, condition);
  },
  //xoa
  remove_loai: function remove_loai(id) {
    return db.load("delete from ".concat(tbl_loai, " where MaLoai=").concat(id));
  },
  //// End loại ////
  //// Start khách hàng ////
  // lấy danh sách khách hàng
  all_kh: function all_kh() {
    return db.load("select *from ".concat(tbl_khachhang));
  },
  all_hoadon: function all_hoadon(makh) {
    return db.load("select *from hoadon");
  },
  all_hoadonkh: function all_hoadonkh(makh) {
    return db.load("select *from hoadon where makh=".concat(makh));
  },
  all_hoadonct: function all_hoadonct(mahd) {
    return db.load("SELECT ct.*,hd.*\n    FROM chitiethd ct INNER JOIN hoadon hd ON ct.mahd=hd.mahd\n    WHERE hd.mahd=".concat(mahd));
  },
  //sua hoadon
  single_hd: function single_hd(id) {
    return db.load("select * from hoadon where mahd=".concat(id));
  },
  //
  //sua trang thai hoa don
  single_choxacnhan: function single_choxacnhan() {
    return db.load("select * from hoadon where trangthai=\"Ch\u1EDD x\xE1c nh\u1EADn\"");
  },
  //capnhat trang thai hoa don
  update_hd: function update_hd(entity) {
    var condition = {
      mahd: entity.mahd
    };
    delete entity.mahd;
    return db.update_hoadon(tbl_hoadon, entity, condition);
  },
  //
  //sua trang thai hoa don
  single_daxacnhan: function single_daxacnhan() {
    return db.load("select * from hoadon where trangthai=\"\u0110\xE3 x\xE1c nh\u1EADn\"");
  },
  //
  //sua trang thai hoa don
  single_danggiao: function single_danggiao() {
    return db.load("select * from hoadon where trangthai=\"\u0110ang giao\"");
  },
  //
  //sua trang thai hoa don
  single_danhan: function single_danhan() {
    return db.load("select * from hoadon where trangthai=\"\u0110\xE3 nh\u1EADn h\xE0ng\"");
  },
  //
  //sua trang thai hoa don
  single_dahuy: function single_dahuy() {
    return db.load("select * from hoadon where trangthai=\"\u0110\xE3 h\u1EE7y\"");
  },
  //// End khách hàng ////
  //// Start Quản trị////
  // lấy danh sách quản trị
  all_nv: function all_nv() {
    return db.load("SELECT * FROM ".concat(tbl_quantri));
  },
  //them quan trị
  add_nv: function add_nv(entity) {
    return db.insert_tk(tbl_quantri, entity);
  },
  //sua 
  single_nv: function single_nv(id) {
    return db.load("select * from ".concat(tbl_quantri, " where manv =").concat(id));
  },
  //capnhat
  update_nv: function update_nv(entity) {
    var condition = {
      manv: entity.manv
    };
    delete entity.manv;
    return db.update_tk(tbl_quantri, entity, condition);
  },
  //xoa
  remove_nv: function remove_nv(id) {
    return db.load("delete from ".concat(tbl_quantri, " where manv=").concat(id));
  },
  //login admin

  /* singleUserName: async function (username) {
   const rows = await db.load(
     `select * from ${tbl_quantri} where username = '${username}' AND quyen="admin"`
   );
   if (rows.length === 0) {
     return null;
   }
   return rows[0];
  }, */
  //login nhanvien
  singleUserName: function singleUserName(username) {
    var rows;
    return regeneratorRuntime.async(function singleUserName$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(db.load("select * from ".concat(tbl_quantri, " where username = '").concat(username, "'")));

          case 2:
            rows = _context2.sent;

            if (!(rows.length === 0)) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", null);

          case 5:
            return _context2.abrupt("return", rows[0]);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  //login admin
  singleUserName_ad: function singleUserName_ad() {
    return db.load("select * from ".concat(tbl_quantri, " where quyen=\"admin\""));
  },
  singleUserName_all: function singleUserName_all() {
    return db.load("select * from ".concat(tbl_quantri));
  },
  //tổng người dùng
  total_user: function total_user() {
    var rows;
    return regeneratorRuntime.async(function total_user$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(db.load("select COUNT(*) total from khachhang"));

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
  //tổng kho
  total_kho: function total_kho() {
    return db.load("SELECT * FROM sanphamct WHERE sanphamct.soluong >0");
  },
  //tổng số lượng bán
  total_hoadon: function total_hoadon() {
    return db.load("SELECT * FROM hoadon WHERE trangthai= \"\u0110\xE3 nh\u1EADn h\xE0ng\"");
  },
  //tổng số lượng bán
  total_donmoi: function total_donmoi() {
    return db.load("SELECT * FROM hoadon WHERE trangthai= \"Ch\u1EDD x\xE1c nh\u1EADn\"");
  } //// End Quản trị////

};