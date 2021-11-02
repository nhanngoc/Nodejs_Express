"use strict";

//const { delete } = require("../routes/category.route");
var db = require("../utils/db");

var tbl_categories = "Loaisp";
module.exports = {
  all: function all() {
    return db.load("select *from ".concat(tbl_categories));
  },
  allDetails: function allDetails() {
    return db.load("SELECT c.*,COUNT(p.MaSP)AS num_of_products FROM Loaisp c LEFT JOIN Sanpham p ON c.MaLoai=p.MaLoai GROUP BY c.MaLoai,c.TenLoai");
  }
};