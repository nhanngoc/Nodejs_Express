"use strict";

var mysql = require("mysql");

var config = require("../config/default.json"); //kết nối dữ liệu


var tbl_sp = "sanpham";
var tbl_l = "loaisp";
var tbl_tk = "tai_khoan";
var tbl_nv = "nhanvien";
var tbl_kh = "khachhang";
var tbl_order = "hoadon";
var pool = mysql.createPool(config.mysql);
module.exports = {
  load: function load(sql) {
    return new Promise(function (resolve, reject) {
      pool.query(sql, function (error, results, fields) {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  },
  //them products/////////////////////
  insert_pro: function insert_pro(table, entity) {
    return new Promise(function (resolve, reject) {
      var sql = "insert into ".concat(tbl_sp, " set ?");
      pool.query(sql, entity, function (error, results) {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  },
  //cap nhat products
  update_pro: function update_pro(table, entity, condition) {
    return new Promise(function (resolve, reject) {
      var sql = "update ".concat(tbl_sp, " set ? where ?");
      pool.query(sql, [entity, condition], function (error, results) {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  },
  //delete products
  delete_pro: function delete_pro(table, condition) {
    return new Promise(function (resolve, reject) {
      var sql = "delete from ".concat(tbl_sp, " where ?");
      pool.query(sql, condition, function (error, results) {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  },
  //them categories///////////////////////
  insert_loai: function insert_loai(table, entity) {
    return new Promise(function (resolve, reject) {
      var sql = "insert into ".concat(tbl_l, " set ?");
      pool.query(sql, entity, function (error, results) {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  },
  //cap nhat categories
  update_loai: function update_loai(table, entity, condition) {
    return new Promise(function (resolve, reject) {
      var sql = "update ".concat(tbl_l, " set ? where ?");
      pool.query(sql, [entity, condition], function (error, results) {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  },
  //delete categories
  delete_loai: function delete_loai(table, condition) {
    return new Promise(function (resolve, reject) {
      var sql = "delete from ".concat(tbl_l, " where ?");
      pool.query(sql, condition, function (error, results) {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  },
  //them tai khoan///////////////////////////
  insert_tk: function insert_tk(table, entity) {
    return new Promise(function (resolve, reject) {
      var sql = "insert into ".concat(tbl_tk, " set ?");
      pool.query(sql, entity, function (error, results) {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  },
  //cap nhat tai khoan
  update_tk: function update_tk(table, entity, condition) {
    return new Promise(function (resolve, reject) {
      var sql = "update ".concat(tbl_tk, " set ? where ?");
      pool.query(sql, [entity, condition], function (error, results) {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  },
  //delete tai khoan
  delete_tk: function delete_tk(table, condition) {
    return new Promise(function (resolve, reject) {
      var sql = "delete from ".concat(tbl_tk, " where ?");
      pool.query(sql, condition, function (error, results) {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  },
  //them register khách hàng//////////////////////////
  insert_kh: function insert_kh(table, entity) {
    return new Promise(function (resolve, reject) {
      var sql = "insert into ".concat(tbl_kh, " set ?");
      pool.query(sql, entity, function (error, results) {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  },
  //cap nhat khách hàng
  update_kh: function update_kh(table, entity, condition) {
    return new Promise(function (resolve, reject) {
      var sql = "update ".concat(tbl_kh, " set ? where ?");
      pool.query(sql, [entity, condition], function (error, results) {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  },
  //delete khách hàng
  delete_kh: function delete_kh(table, condition) {
    return new Promise(function (resolve, reject) {
      var sql = "delete from ".concat(tbl_kh, " where ?");
      pool.query(sql, condition, function (error, results) {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  },
  //them order hoadon//////////////////////////
  insert_order: function insert_order(table, entity) {
    return new Promise(function (resolve, reject) {
      var sql = "insert into ".concat(tbl_order, " set ?");
      pool.query(sql, entity, function (error, results) {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  }
};