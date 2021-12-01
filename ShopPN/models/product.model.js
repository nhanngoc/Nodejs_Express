const db = require("../utils/db");
const tbl_products = "Sanpham";

module.exports = {
  all: function () {
    return db.load(`select *from ${tbl_products}`);
  },
  //cart//////////////
  single_cart: function (id) {
    return db.load(`select *from ${tbl_products} where MaSP =${id}`);
  },
  //cart//////////////
  single_carts: function (id) {
    return db.load(`SELECT ct.*,sp.*
    FROM sanphamct ct INNER JOIN sanpham sp ON ct.masp=sp.MaSP
    WHERE ct.sp_id=${id} `);
  },
  single_cc:function(id){
    return db.load(` `);

  },

  //detail
  detail_ct: function (MaSP, color, size) {
    return db.load(`SELECT sanpham.*,colors.*,sanphamct.* ,sizes.* 
    FROM ((sanphamct INNER JOIN sanpham ON sanphamct.masp = sanpham.MaSP) 
    INNER JOIN colors ON sanphamct.color_id = colors.color_id 
    INNER JOIN sizes ON sanphamct.size_id=sizes.size_id ) 
    WHERE sanphamct.masp=${MaSP} `);  
  },
  //lọc color
  detail_color: function (id) {
    return db.load(`SELECT DISTINCT colors.color_id,colors.color
    FROM ((sanphamct INNER JOIN sanpham ON sanphamct.masp = sanpham.MaSP) 
    INNER JOIN colors ON sanphamct.color_id = colors.color_id ) 
    WHERE sanphamct.masp=${id}`);
  },
  //lọc size
  detail_size: function (id) {
    return db.load(`select *from ${tbl_products} where MaSP =${id}`);
  },
  detail: function (id) {
    return db.load(`select *from ${tbl_products} where MaSP =${id}`);
  },
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
    const rows = await db.load(`select count(*) as total from ${tbl_products} where maloai =${MaLoai}`);
    return rows[0].total;
  },
};
