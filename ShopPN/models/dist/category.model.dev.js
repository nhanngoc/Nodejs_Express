"use strict";

//const { delete } = require("../routes/category.route");
var db = require("../utils/db");

var tbl_categories = "Loaisp";
module.exports = {
  all: function all() {
    return db.load("select *from ".concat(tbl_categories));
  },
  allDetails: function allDetails() {
    return db.load("SELECT c.*,COUNT(p.MaSP)AS num_of_products \n      FROM Loaisp c LEFT JOIN Sanpham p ON c.MaLoai=p.MaLoai \n      GROUP BY c.MaLoai,c.TenLoai");
  },
  danhmuc0: function danhmuc0() {
    return db.load("SELECT c.*,COUNT(p.MaSP)AS num_of_products \n      FROM Loaisp c LEFT JOIN Sanpham p ON c.MaLoai=p.MaLoai \n      WHERE MaDM=0 GROUP BY c.MaLoai,c.MaDM ");
  },
  danhmuc1: function danhmuc1() {
    return db.load("SELECT c.*,COUNT(p.MaSP)AS num_of_products \n      FROM Loaisp c LEFT JOIN Sanpham p ON c.MaLoai=p.MaLoai \n      WHERE MaDM=1 GROUP BY c.MaLoai,c.MaDM ");
  },
  danhmuc2: function danhmuc2() {
    return db.load("SELECT c.*,COUNT(p.MaSP)AS num_of_products \n      FROM Loaisp c LEFT JOIN Sanpham p ON c.MaLoai=p.MaLoai \n      WHERE MaDM=2 GROUP BY c.MaLoai,c.MaDM ");
  }
};