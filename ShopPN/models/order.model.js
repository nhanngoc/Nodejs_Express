const db = require("../utils/db");
const tbl_order = "hoadon";

module.exports = {
  all: function () {
    return db.load(`select *from ${tbl_order}`);
  },
  //them products
  add_order: function (order) {
    return db.insert_order(tbl_order, order);
  },
};
