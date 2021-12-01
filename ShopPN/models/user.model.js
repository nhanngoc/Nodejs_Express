//const { delete } = require("../routes/category.route");
const db = require("../utils/db");
const tbl_Users = "khachhang";
const data = [];

module.exports = {
  //hàm lấy danh sách users từ table
  all: function () {
    return db.load(`select *from ${tbl_Users}`);
  },
  //
  all_id: function (MaKH) {
    return db.load(`select *from ${tbl_Users} where MaKH =${MaKH}`);
  },
  //them username khách hàng
  add_kh: function (entity) {
    return db.insert_kh(tbl_Users, entity);
  },
  //dung await phair dung async 
  singleUserName: async function (username) {
    const rows = await db.load(
      `select * from ${tbl_Users} where username = '${username}'`
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  },
  //sua
  single: function (MaKH) {
    return db.load(`select *from ${tbl_Users} where MaKH =${MaKH}`);
  },
  //capnhat
  patch: function (entity) {
    const condition = {
      MaKH: entity.MaKH,
    };
    delete entity.MaKH;
    return db.update_kh(tbl_Users, entity, condition);
  },
  //xoa
  del: function (MaKH) {
    const condition = { MaKH };
    return db.delete_kh(tbl_Users, condition);
  },
};
