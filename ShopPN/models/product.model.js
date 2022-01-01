const db = require("../utils/db");
const tbl_products = "Sanpham";

module.exports = {
  all: function () {
    return db.load(`select *from ${tbl_products}`);
  },
  seach_products: function () {
    return db.load(`SELECT DISTINCT sp.*
    FROM ((sanphamct ct INNER JOIN sanpham sp ON ct.masp = sp.MaSP) 
    INNER JOIN colors ON ct.color_id = colors.color_id 
    INNER JOIN sizes ON ct.size_id=sizes.size_id )`);
  }, 
  //giam gia
  all_giamgia: function () {
    return db.load(`select *from giamgia`);
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
    return db.load(`SELECT sizes.*,ct.color_id,ct.soluong
    FROM ((sanphamct ct INNER JOIN sanpham sp ON ct.masp = sp.MaSP) 
    INNER JOIN sizes ON ct.size_id = sizes.size_id ) 
    WHERE sp.MaSP=${id}`);
  },
  detail: function (id) {
    return db.load(`select *from ${tbl_products} where MaSP =${id}`);
  },
  //giam gia
  detail_gg: function (id) {
    return db.load(`select sanpham.*,giamgia.*
    from sanpham INNER JOIN giamgia ON sanpham.MaSP=giamgia.makm
    where MaSP =${id}`);
  },
  //giam gai
  detail_ggg: function () {
    return db.load(`select giamgia.* from giamgia`);
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
  //tất cả bé gái
  pageByCat_gai: function (limit, offset) {
    return db.load(
      `select *
      from ((loaisp INNER JOIN sanpham ON sanpham.MaLoai=loaisp.MaLoai)
            INNER JOIN danhmuc ON loaisp.MaDM=danhmuc.MaDM)
      where loaisp.MaDM=0 
      order by sanpham.MaSP DESC 
      limit ${limit} offset ${offset}`
    );
  },
   //tất cả bé trai
   pageByCat_trai: function (limit, offset) {
    return db.load(
      `select *
      from ((loaisp INNER JOIN sanpham ON sanpham.MaLoai=loaisp.MaLoai)
            INNER JOIN danhmuc ON loaisp.MaDM=danhmuc.MaDM)
      where loaisp.MaDM=1 
      order by sanpham.MaSP DESC 
      limit ${limit} offset ${offset}`
    );
  },
  // ten loai
  tenloai: function (maloai) {
    return db.load(
      `select *from loaisp where MaLoai=${maloai}`
    );
  },
  // ten loai danh muc
  all_dm: function () {
    return db.load(`select *from danhmuc`);
  },
  //new loại danh mục be gai
  pageloai0: function (madm,limit, offset) {
    return db.load(
      `select *
      from ((loaisp INNER JOIN sanpham ON sanpham.MaLoai=loaisp.MaLoai)
            INNER JOIN danhmuc ON loaisp.MaDM=danhmuc.MaDM)
      where loaisp.MaDM=${madm} 
      order by sanpham.MaSP DESC
      limit ${limit} offset ${offset}`
    );
  },
  //sản phẩm mới
  allProduct: function (limit, offset) {
    return db.load(
      `SELECT DISTINCT sp.*
      FROM sanpham AS sp INNER JOIN sanphamct AS ct ON ct.masp=sp.MaSP 
      order by sp.MaSP DESC limit ${limit} offset ${offset}`
    );
  },
  //sản phẩm giảm giá
  giam_gia: function () {
    return db.load(
      `select gg.*,sp.*
      from giamgia gg INNER JOIN sanpham sp ON gg.makm=sp.MaSP
      order by makm DESC`
    );
  },
   //sản phẩm mới
   newProduct: function () {
    return db.load(
      `SELECT DISTINCT sp.*
      FROM sanpham AS sp INNER JOIN sanphamct AS ct ON ct.masp=sp.MaSP
       order by sp.MaSP DESC limit 8 offset 0`
    );
  },

  //phan trang
  pageByHome: function (maloai, limit, offset) {
    return db.load(
      `select *from ${tbl_products} limit ${limit} offset ${offset}`
    );
  },
  /* countByCat: async function () {
    const rows = await db.load(`select count(*) as total from ${tbl_products}`);
    return rows[0].total;
  }, */
  countByCat: async function () {
    return db.load(`SELECT DISTINCT sp.*
    FROM sanpham AS sp INNER JOIN sanphamct AS ct ON ct.masp=sp.MaSP 
    order by sp.MaSP`);
  },
  
  
  countByLoai: async function (MaLoai) {
    const rows = await db.load(
      `select count(*) as total from ${tbl_products} where maloai =${MaLoai}`
    );
    return rows[0].total;
  },
  //All_sanpham_loai
  countByLoai0: async function (madm) {
    const rows = await db.load(
      `select count(*) as total 
      from ((loaisp INNER JOIN sanpham ON sanpham.MaLoai=loaisp.MaLoai)
                  INNER JOIN danhmuc ON loaisp.MaDM=danhmuc.MaDM)
            where loaisp.MaDM=${madm}`
    );
    return rows[0].total;
  },
  //all_san pham loại bé gái
  countByLoai_gai: async function () {
    const rows = await db.load(
      `select count(*) as total 
      from ((loaisp INNER JOIN sanpham ON sanpham.MaLoai=loaisp.MaLoai)
                  INNER JOIN danhmuc ON loaisp.MaDM=danhmuc.MaDM)
            where loaisp.MaDM=0`
    );
    return rows[0].total;
  },
  //all_san pham loại bé trai
  countByLoai_trai: async function () {
    const rows = await db.load( 
      `select count(*) as total 
      from ((loaisp INNER JOIN sanpham ON sanpham.MaLoai=loaisp.MaLoai)
                  INNER JOIN danhmuc ON loaisp.MaDM=danhmuc.MaDM)
            where loaisp.MaDM=1`
    );
    return rows[0].total;
  },
};
