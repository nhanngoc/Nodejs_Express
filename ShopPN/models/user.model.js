//const { delete } = require("../routes/category.route");
const db = require("../utils/db");
const tbl_Users = "khachhang";
const data = [];

module.exports = {
  //hàm lấy danh sách users từ table
  all: function () {
    return db.load(`select *from ${tbl_Users}`);
  },
  //them username
  add: function (entity) {
    return db.add_user(tbl_Users, entity);
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
    return db.patch(tbl_Users, entity, condition);
  },
  //xoa
  del: function (MaKH) {
    const condition = { MaKH };
    return db.del(tbl_Users, condition);
  },
};
