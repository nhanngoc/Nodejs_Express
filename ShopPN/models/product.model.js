const db = require("../utils/db");
const tbl_products = "Sanpham";

module.exports = {
  all: function () {
    return db.load(`select *from ${tbl_products}`);
  },
  //cart//////////////
  single_cart: function (id, cl, si) {
    return db.load(`
    SELECT sp.*,colors.*,ct.* ,sizes.* 
    FROM ((sanphamct ct INNER JOIN sanpham sp ON ct.masp = sp.MaSP) 
    INNER JOIN colors ON ct.color_id = colors.color_id 
    INNER JOIN sizes ON ct.size_id=sizes.size_id ) 
    WHERE sp.MaSP = ${id} AND ct.color_id=${cl} AND ct.size_id=${si}`);
  },
  //cart//////////////
  single_carts: function (id) {
    return db.load(`SELECT ct.*,sp.*
    FROM sanphamct ct INNER JOIN sanpham sp ON ct.masp=sp.MaSP
    WHERE ct.sp_id=${id} `);
  },

  //detail start///
  detail_ct: function (MaSP, color, size) {
    return db.load(`SELECT sanpham.*,colors.*,sanphamct.* ,sizes.* 
    FROM ((sanphamct INNER JOIN sanpham ON sanphamct.masp = sanpham.MaSP) 
    INNER JOIN colors ON sanphamct.color_id = colors.color_id 
    INNER JOIN sizes ON sanphamct.size_id=sizes.size_id ) 
    WHERE sanphamct.masp=${MaSP} `);
  },
  detail_anh: function (id) {
    return db.load(`SELECT ct.*,sp.*
    FROM sanpham sp JOIN anhct ct ON sp.MaSP=ct.MaSP
    WHERE ct.MaSP=${id}`);
  },
  //lọc color
  distinct_color: function (id) {
    return db.load(`SELECT DISTINCT colors.color_id,colors.color
    FROM ((sanphamct INNER JOIN sanpham ON sanphamct.masp = sanpham.MaSP) 
    INNER JOIN colors ON sanphamct.color_id = colors.color_id ) 
    WHERE sanpham.MaSP=${id}`);
  },
  //lọc size
  distinct_size: function (id) {
    return db.load(`SELECT DISTINCT sizes.* 
    FROM ((sanphamct INNER JOIN sanpham ON sanphamct.masp = sanpham.MaSP) 
    INNER JOIN sizes ON sanphamct.size_id = sizes.size_id ) 
    WHERE sanpham.MaSP=${id}`);
  },
  //size
  detail_size: function (id) {
    return db.load(`SELECT sizes.*,sanphamct.color_id
    FROM ((sanphamct INNER JOIN sanpham ON sanphamct.masp = sanpham.MaSP) 
    INNER JOIN sizes ON sanphamct.size_id = sizes.size_id ) 
    WHERE sanpham.MaSP=${id}`);
  },
  detail: function (id) {
    return db.load(`select *from ${tbl_products} where MaSP =${id}`);
  },
  size: function () {
    return db.load(`select * from sizes`);
  },
  //detail end///

  /*  allByCat: function (maloai) {
    return db.load(`select *from ${tbl_products} where maloai =${maloai}`);
  }, */
  //loại danh mục sản phẩm
  pageByCat: function (MaLoai, limit, offset) {
    return db.load(
      `select *from ${tbl_products} where maloai =${MaLoai} limit ${limit} offset ${offset}`
    );
  },
  //sản phẩm mới
  newProduct: function (limit, offset) {
    return db.load(
      `select *from ${tbl_products} order by MaSP DESC limit ${limit} offset ${offset}`
    );
  },
  //phan trang
  pageByHome: function (maloai, limit, offset) {
    return db.load(
      `select *from ${tbl_products} limit ${limit} offset ${offset}`
    );
  },
  countByCat: async function () {
    const rows = await db.load(`select count(*) as total from ${tbl_products}`);
    return rows[0].total;
  },
  countByLoai: async function (MaLoai) {
    const rows = await db.load(
      `select count(*) as total from ${tbl_products} where maloai =${MaLoai}`
    );
    return rows[0].total;
  },
};
