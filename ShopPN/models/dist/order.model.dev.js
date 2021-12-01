"use strict";

var db = require("../utils/db");

var tbl_order = "hoadon";
module.exports = {
  all: function all() {
    return db.load("select *from ".concat(tbl_order));
  },
  //them products
  add_order: function add_order(order) {
    return db.insert_order(tbl_order, order);
  }
};