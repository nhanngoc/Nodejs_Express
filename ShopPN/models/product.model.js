const db = require("../utils/db");
const tbl_products = "Sanpham";

module.exports = {
  all: function () {
    return db.load(`select *from ${tbl_products}`);
  },

  allByCat: function (maloai) {
    return db.load(`select *from ${tbl_products} where maloai =${maloai}`);
  },
  //hãng sản phẩm
  pageByCat: function (MaLoai, limit, offset) {
    return db.load(
      `select *from ${tbl_products} where maloai =${MaLoai} limit ${limit} offset ${offset}`
    );
  },
  //phan trang
  pageByHome: function (maloai, limit, offset) {
    return db.load(`select *from ${tbl_products} limit ${limit} offset ${offset}`);
  },
  countByCat: async function () {
    const rows = await db.load(`select count(*) as total from ${tbl_products}`);
    return rows[0].total;
  },
  //phan trang
  pageHome: function (limit, offset) {
    return db.load(`select *from ${tbl_products} limit ${limit} offset ${offset}`);
  },
}