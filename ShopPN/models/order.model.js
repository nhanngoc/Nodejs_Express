const db = require("../utils/db");
const tbl_hoadon = "hoadon";
const tbl_chitiethd = "chitiethd";

module.exports = {
  all: function () {
    return db.load(`select *from ${tbl_hoadon}`);
  },
  //thông tin hóa đơn mới
  all_order: function () {
    return db.load(`select *from hoadon ORDER BY hoadon.mahd DESC LIMIT 1`);
  },
  //thông tin bảng khách hàng
  all_khanhhang: function () {
    return db.load(`select *from khachhang`);
  },
  //thông tin hóa đơn theo mã khách hàng
  all_order_makh: function (makh) {
    return db.load(`select *from hoadon WHERE makh=${makh}
    ORDER BY hoadon.mahd DESC`);
  },
  //get choxacnhan hóa đơn theo mã khách hàng
  all_order_choxacnhan: function (makh) {
    return db.load(`select *from hoadon WHERE makh=${makh} AND trangthai="Chờ xác nhận"
    ORDER BY hoadon.mahd DESC`);
  },
  total_choxacnhan: async function (makh) {
    const rows = await db.load(
      `select COUNT(*)AS total from hoadon WHERE makh=${makh} AND trangthai="Chờ xác nhận"
    `
    );
    return rows[0].total;
  },
  //get daxacnhan hóa đơn theo mã khách hàng
  all_order_daxacnhan: function (makh) {
    return db.load(`select *from hoadon WHERE makh=${makh} AND trangthai="Đã xác nhận"
    ORDER BY hoadon.mahd DESC`);
  },
  total_daxacnhan: async function (makh) {
    const rows = await db.load(
      `select COUNT(*)AS total from hoadon WHERE makh=${makh} AND trangthai="Đã xác nhận"
    `
    );
    return rows[0].total;
  },
  //get danggiao hóa đơn theo mã khách hàng
  all_order_danggiao: function (makh) {
    return db.load(`select *from hoadon WHERE makh=${makh} AND trangthai="Đang giao"
    ORDER BY hoadon.mahd DESC`);
  },
  total_danggiao: async function (makh) {
    const rows = await db.load(
      `select COUNT(*)AS total from hoadon WHERE makh=${makh} AND trangthai="Đang giao"
    `
    );
    return rows[0].total;
  },
  //get danhanhang hóa đơn theo mã khách hàng
  all_order_danhanhang: function (makh) {
    return db.load(`select *from hoadon WHERE makh=${makh} AND trangthai="Đã nhận hàng"
    ORDER BY hoadon.mahd DESC`);
  },
  total_danhanhang: async function (makh) {
    const rows = await db.load(
      `select COUNT(*)AS total from hoadon WHERE makh=${makh} AND trangthai="Đã nhận hàng"
    `
    );
    return rows[0].total;
  },
  //get dahuy hóa đơn theo mã khách hàng
  all_order_dahuy: function (makh) {
    return db.load(`select *from hoadon WHERE makh=${makh} AND trangthai="Đã hủy"
    ORDER BY hoadon.mahd DESC`);
  },
  total_dahuy: async function (makh) {
    const rows = await db.load(
      `select COUNT(*)AS total from hoadon WHERE makh=${makh} AND trangthai="Đã hủy"
    `
    );
    return rows[0].total;
  },
   //capnhat trang thai dahuy hoa don
   update_hd: function (entity) {
    const condition = {
      mahd: entity.mahd,
    };
    delete entity.mahd;
    return db.update_hoadon(tbl_hoadon, entity, condition);
  },
  //thông tin chi tiết đơn hàng
  all_order_ct: function (mahd) {
    return db.load(`SELECT ct.*, hd.*, sp.Anh,sp.TenSP,sp.Gia,sp.chatlieu
    FROM ((chitiethd ct INNER JOIN hoadon hd ON ct.mahd=hd.mahd)
        INNER JOIN sanpham sp ON ct.masp=sp.MaSP)
    WHERE hd.mahd=${mahd}`);
  },
  // lấy thông tin hóa đơn theo mã hóa đơn
  all_order_mahd: function (mahd) {
    return db.load(`SELECT * FROM hoadon WHERE hoadon.mahd=${mahd}`);
  },

  //them hoa don
  add_order: function (entity) {
    return db.insert_hoadon(tbl_hoadon, entity);
  },
  // lấy id hoadon mới
  id_order: async function () {
    const rows = await db.load(
      `SELECT  mahd FROM ${tbl_hoadon} ORDER BY hoadon.mahd DESC LIMIT 1`
    );
    return rows[0].mahd;
  },
};
