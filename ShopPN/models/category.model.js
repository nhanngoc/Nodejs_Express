//const { delete } = require("../routes/category.route");
const db = require("../utils/db");
const tbl_categories = "Loaisp";
module.exports = {
  all: function () {
    return db.load(`select *from ${tbl_categories}`);
  },
  allDetails: function () {
    return db.load(
      `SELECT c.*,COUNT(p.MaSP)AS num_of_products 
      FROM Loaisp c LEFT JOIN Sanpham p ON c.MaLoai=p.MaLoai 
      GROUP BY c.MaLoai,c.TenLoai`
    );
  },
  danhmuc0: function () {
    return db.load(
      `SELECT c.*,COUNT(p.MaSP)AS num_of_products 
      FROM Loaisp c LEFT JOIN Sanpham p ON c.MaLoai=p.MaLoai 
      WHERE MaDM=0 GROUP BY c.MaLoai,c.MaDM `
    );
  },
  danhmuc1: function () {
    return db.load(
      `SELECT c.*,COUNT(p.MaSP)AS num_of_products 
      FROM Loaisp c LEFT JOIN Sanpham p ON c.MaLoai=p.MaLoai 
      WHERE MaDM=1 GROUP BY c.MaLoai,c.MaDM `
    );
  },
  danhmuc2: function () {
    return db.load(
      `SELECT c.*,COUNT(p.MaSP)AS num_of_products 
      FROM Loaisp c LEFT JOIN Sanpham p ON c.MaLoai=p.MaLoai 
      WHERE MaDM=2 GROUP BY c.MaLoai,c.MaDM `
    );
  },
};
