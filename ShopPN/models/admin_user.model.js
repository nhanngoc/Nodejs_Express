//const { delete } = require("../routes/category.route");
const db = require("../utils/db");
const tbl_sp = "sanpham";
const tbl_gg ="giamgia";
const tbl_spct = "sanphamct";
const tbl_loai = "loaisp";
const tbl_khachhang = "khachhang";
const tbl_hoadon = "hoadon";
const tbl_chitiethd ="chitiethd"
const tbl_quantri = "quantri";
const data = [];

module.exports = {
  ////Start sản phẩm////
  // lấy danh sách sản phẩm
  all_products: function () {
    return db.load(`select *from ${tbl_sp}`);
  },
  //ds sản phẩm chưa có thuộc tính
  _products: function () {
    return db.load(`SELECT sp.*, ct.*
    FROM sanpham AS sp LEFT JOIN sanphamct AS ct ON ct.masp=sp.MaSP
    WHERE ct.sp_id IS NULL `);
  },
  //ds sản phẩm có thuộc tính
  //
  attr_products: function () {
    return db.load(`SELECT DISTINCT sp.*
    FROM sanpham AS sp INNER JOIN sanphamct AS ct ON ct.masp=sp.MaSP order by sp.MaSP DESC`);
  },
  //ds màu và masp
  distinct_colors: function () {
    return db.load(`SELECT DISTINCT cl.*,ct.masp
    FROM sanphamct AS ct INNER JOIN colors AS cl ON ct.color_id=cl.color_id`);
  },
  //ds size, color_id và masp
  distinct_sizes: function () {
    return db.load(`SELECT sz.*,ct.masp,ct.color_id,ct.soluong
    FROM sanphamct AS ct INNER JOIN sizes AS sz ON ct.size_id=sz.size_id`);
  },

  //danh sách màu
  attr_colors: function(){
    return db.load(`select * from colors`);
  },
  //danh sách size
  attr_sizes: function(){
    return db.load(`select * from sizes`);
  },

  //laasy danh sach sanphamct
  all_spct: function () {
    return db.load(`select *from ${tbl_spct}`);
  },
  //chitiethd where mahd
  hd_id: function (id) {
    return db.load(`select *from ${tbl_chitiethd} where mahd=${id}`);
  },
  //capnhat sanphamct
  update_spct: function (entity) {
    const condition = {
      sp_id: entity.sp_id,
    };
    delete entity.sp_id;
    return db.patch_spct(tbl_spct, entity, condition);
  },
 
  //them products
  add_pro: function (entity) {
    return db.insert_pro(tbl_sp, entity);
  },
   // lấy id sản phẩm
   id_sp: async function () {
    const rows = await db.load(`SELECT  MaSP FROM ${tbl_sp} ORDER BY sanpham.MaSP DESC LIMIT 1`);
    return rows[0].MaSP;
  },
  //remove products attribute
  remove_attr: function (id) {
    return db.load(`delete from ${tbl_spct} where MaSP =${id}`);
  },
   //remove attr detail
   remove_attr_detail: function (id) {
    return db.load(`delete from ${tbl_spct} where sp_id =${id}`);
  },
  //remove products
  remove_pro: function (id) {
    return db.load(`delete from ${tbl_sp} where MaSP =${id}`);
  },
  //remove anhct
  remove_anhct: function (id) {
    return db.load(`delete from anhct where MaSP =${id}`);
  },
  //sua products
  single_pro: function (id) {
    return db.load(`select *from ${tbl_sp} where MaSP =${id}`);
  },
  //sua products attribute
  single_attr_ct: function (id) {
    return db.load(`SELECT ct.sp_id,ct.masp,ct.soluong,cl.*,si.* 
    FROM ((sanphamct ct INNER JOIN colors cl ON ct.color_id = cl.color_id) 
    INNER JOIN sizes si ON ct.size_id=si.size_id )
    WHERE ct.masp=${id}`);
  },
  //sua products attribute detail
  single_attr_detail: function (id) {
    return db.load(`SELECT ct.sp_id,ct.masp,ct.soluong,cl.*,si.* 
    FROM ((sanphamct ct INNER JOIN colors cl ON ct.color_id = cl.color_id) 
    INNER JOIN sizes si ON ct.size_id=si.size_id )
    WHERE ct.sp_id=${id}`);
  },
  //sua products attribute detail
  sizes_list: function (id) {
    return db.load(`SELECT * FROM sizes`);
  },
  //capnhat products attribute detail
  patch_attr_detail: function (entity) {
    const condition = {
      sp_id: entity.sp_id,
    };
    delete entity.sp_id;
    return db.update_attr_detail(tbl_spct, entity, condition);
  },
   //capnhat products attribute
   patch_attr: function (entity) {
    const condition = {
      MaSP: entity.MaSP,
    };
    delete entity.MaSP;
    return db.update_attr(tbl_sp, entity, condition);
  },
  //capnhat products
  patch_pro: function (entity) {
    const condition = {
      MaSP: entity.MaSP,
    };
    delete entity.MaSP;
    return db.update_pro(tbl_sp, entity, condition);
  },

  //xoa products
  del: function (id) {
    const condition = {
      MaSP: id,
    };
    return db.delete_pro(tbl_sp, condition);
  },
  //lấy danh giảm giá
  all_gg: function () {
    return db.load(`select gg.*,sp.TenSP,sp.Anh,sp.Gia from giamgia gg 
    INNER JOIN sanpham sp ON gg.makm=sp.MaSP`);
  },
  //all sản phẩm chưa khuyến mãi
  all_sp_gg: function () {
    return db.load(`SELECT sp.*
    FROM sanpham sp LEFT JOIN giamgia gg ON gg.makm=sp.MaSP
    WHERE gg.makm IS NULL
    order by sp.MaSP DESC`);
  },
  //all sản phẩm chưa khuyến mãi
  id_sp_gg: function (id) {
    return db.load(`SELECT * FROM sanpham WHERE MaSP=${id}`);
  },
  //Thêm mới giảm giá
  add_gg: function (entity) {
    return db.insert_gg(tbl_gg, entity);
  },
  //sua
  single_gg: function (id) {
    return db.load(`select gg.*,sp.* from giamgia gg 
    INNER JOIN sanpham sp ON gg.makm=sp.MaSP where makm =${id}`);
  },
  //capnhat
  update_gg: function (entity) {
    const condition = {
      makm: entity.makm,
    };
    delete entity.makm;
    return db.patch_gg(tbl_gg, entity, condition);
  },
  //xoa
  remove_gg: function (id) {
    return db.load(`delete from giamgia where makm=${id}`);
  },
  ////End sản phẩm////

  //// Start loại ////
  //lấy danh sách loại
  distinct_category: function () {
    return db.load(`SELECT DISTINCT sanpham.MaLoai FROM sanpham`);
  },
  all_category: function () {
    return db.load(`SELECT * FROM ${tbl_loai} WHERE loaisp.MaDM IN(0,1)`);
  }, 
  //lấy danh sách danh mục
  all_dm: function () {
    return db.load(`SELECT * FROM danhmuc WHERE MaDM IN(0,1)`);
  },
    //Thêm mới loại
  add_loai: function (entity) {
    return db.insert_loai(tbl_loai, entity);
  },
  //sua
  single_loai: function (id) {
    return db.load(`SELECT * FROM ${tbl_loai} WHERE MaLoai=${id}`);
  },
  //capnhat
  update_loai: function (entity) {
    const condition = {
      MaLoai: entity.MaLoai,
    };
    delete entity.MaLoai;
    return db.update_loai(tbl_loai, entity, condition);
  },
  //xoa
  remove_loai: function (id) {
    return db.load(`delete from ${tbl_loai} where MaLoai=${id}`);
  },
  //// End loại ////

  //// Start khách hàng ////
  // lấy danh sách khách hàng
  all_kh: function () {
    return db.load(`select *from ${tbl_khachhang}`);
  },
  all_hoadon: function (makh) {
    return db.load(`select *from hoadon`);
  },
  all_hoadonkh: function (makh) {
    return db.load(`select *from hoadon where makh=${makh}`);
  },
  all_hoadonct: function (mahd) {
    return db.load(`SELECT ct.*,hd.*
    FROM chitiethd ct INNER JOIN hoadon hd ON ct.mahd=hd.mahd
    WHERE hd.mahd=${mahd}`);
  },
  //sua hoadon
  single_hd: function (id) {
    return db.load(`select * from hoadon where mahd=${id}`);
  },

  //
  //sua trang thai hoa don
  single_choxacnhan: function () {
    return db.load(`select * from hoadon where trangthai="Chờ xác nhận"`);
  },
  //capnhat trang thai hoa don
  update_hd: function (entity) {
    const condition = {
      mahd: entity.mahd,
    };
    delete entity.mahd;
    return db.update_hoadon(tbl_hoadon, entity, condition);
  },
  //
  //sua trang thai hoa don
  single_daxacnhan: function () {
    return db.load(`select * from hoadon where trangthai="Đã xác nhận"`);
  },
  //
  //sua trang thai hoa don
  single_danggiao: function () {
    return db.load(`select * from hoadon where trangthai="Đang giao"`);
  },
  //
  //sua trang thai hoa don
  single_danhan: function () {
    return db.load(`select * from hoadon where trangthai="Đã nhận hàng"`);
  },
  //
  //sua trang thai hoa don
  single_dahuy: function () {
    return db.load(`select * from hoadon where trangthai="Đã hủy"`);
  },
 
  //// End khách hàng ////

  //// Start Quản trị////
  // lấy danh sách quản trị
  all_nv: function () {
    return db.load(
      `SELECT * FROM ${tbl_quantri}`
    );
  },
  //them quan trị
  add_nv: function (entity) {
    return db.insert_tk(tbl_quantri, entity);
  },
  //sua 
  single_nv: function (id) {
    return db.load(`select * from ${tbl_quantri} where manv =${id}`);
  },
  //capnhat
  update_nv: function (entity) {
    const condition = {
      manv: entity.manv,
    };
    delete entity.manv;
    return db.update_tk(tbl_quantri, entity, condition);
  },
  //xoa
  remove_nv: function (id) {
    return db.load(`delete from ${tbl_quantri} where manv=${id}`);
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
   singleUserName: async function (username) {
    const rows = await db.load(
      `select * from ${tbl_quantri} where username = '${username}'`
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  },
  //login admin

  singleUserName_ad: function () {
    return db.load(
      `select * from ${tbl_quantri} where quyen="admin"`
    );
  },
  singleUserName_all: function () {
    return db.load(
      `select * from ${tbl_quantri}`
    );
  },
  //tổng người dùng
  total_user: async function () {
    const rows = await db.load(
      `select COUNT(*) total from khachhang`
    );
    return rows[0].total;
  }, 
  //tổng kho
  total_kho: function () {
    return db.load(
      `SELECT * FROM sanphamct WHERE sanphamct.soluong >0`
    );
  },
  //tổng số lượng bán
  total_hoadon: function () {
    return db.load(
      `SELECT * FROM hoadon WHERE trangthai= "Đã nhận hàng"`
    );
  },
  //tổng số lượng bán
  total_donmoi: function () {
    return db.load(
      `SELECT * FROM hoadon WHERE trangthai= "Chờ xác nhận"`
    );
  },
  //// End Quản trị////
};
