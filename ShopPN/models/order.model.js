const db = require("../utils/db");
const tbl_hoadon = "hoadon";
const tbl_chitiethd = "chitiethd";

module.exports = {
  all: function () {
    return db.load(`select *from ${tbl_hoadon}`);
  },
  
  //them hoa don
  add_order: function (entity) {
    return db.insert_hoadon(tbl_hoadon, entity);
  },
  // lấy id hoadon mới
  id_order: async function () {
    const rows = await db.load(`SELECT  mahd FROM ${tbl_hoadon} ORDER BY hoadon.mahd DESC LIMIT 1`);
    return rows[0].mahd;
  },
};
