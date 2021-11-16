//const { delete } = require("../routes/category.route");
const db = require("../utils/db");
const tbl_tk = "tai_khoan";
const tbl_sp = "sanpham";
const tbl_loai = "Loaisp";
const tbl_khachhang = "khachhang";
const tbl_nhanvien = "nhanvien";
const data = [];

module.exports = {
  // lấy danh sách sản phẩm
  all_products: function () {
    return db.load(`select *from ${tbl_sp}`);
  },
  //them products
  add_pro: function (entity) {
    return db.insert_pro(tbl_sp, entity);
  },
  //remove products
  remove: function (id) {
    return db.load(`delete from ${tbl_sp} where MaSP =${id}`);
  },
  //sua products
  single: function (id) {
    return db.load(`select *from ${tbl_sp} where MaSP =${id}`);
  },
  //capnhat products
  patch: function (entity) {
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


  /////////////////////
   //lấy danh sách loại
  all_category: function () {
    return db.load(`select *from ${tbl_loai}`);
  },

  /////////////////////
   // lấy danh sách khách hàng
   all_kh: function () {
    return db.load(`select *from ${tbl_khachhang}`);
  },






  //////////////////////////////////
  // lấy danh sách users từ table
  all_tk: function () {
    return db.load(`SELECT nv.tennv, tk.username,tk.email,tk.MaQuyen FROM ${tbl_nhanvien} nv LEFT JOIN ${tbl_tk} tk ON nv.MaNV=tk.MaNV`);
  },
  //them username
  add_user: function (entity) {
    return db.insert_tk(tbl_tk, entity);
  },
  //dung await phair dung async
  singleUserName: async function (username) {
    const rows = await db.load(
      `select * from ${tbl_tk} where username = '${username}'`
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  },
  
};
