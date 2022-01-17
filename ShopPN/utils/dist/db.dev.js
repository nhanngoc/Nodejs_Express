"use strict";

var mysql = require("mysql");

var config = require("../config/default.json"); //kết nối dữ liệu


var tbl_sp = "sanpham";
var tbl_spct = "sanphamct";
var tbl_l = "loaisp";
var tbl_qt = "quantri";
var tbl_kh = "khachhang";
var tbl_hoadon = "hoadon";
var tbl_chitiethd = "chitiethd";
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
  //them attribute sanphamct/////////////////////
  insert_attr: function insert_attr(entity) {
    return new Promise(function (resolve, reject) {
      var sql = "insert into ".concat(tbl_spct, "(masp, color_id, size_id,soluong) VALUES ?");
      pool.query(sql, [entity], function (error, results) {
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
  //them nhieu hinh anh anhct/////////////////////
  insert_mutilfile: function insert_mutilfile(entity) {
    return new Promise(function (resolve, reject) {
      var sql = "insert into anhct(MaSP, anh_ten) VALUES ?";
      pool.query(sql, [entity], function (error, results) {
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
  //cap nhat products attribute
  update_attr: function update_attr(table, entity, condition) {
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
  //cap nhat products attribute
  update_attr_detail: function update_attr_detail(table, entity, condition) {
    return new Promise(function (resolve, reject) {
      var sql = "update ".concat(tbl_spct, " set ? where ?");
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
  //them giamgia /////////////////////
  insert_gg: function insert_gg(table, entity) {
    return new Promise(function (resolve, reject) {
      var sql = "insert into giamgia set ?";
      pool.query(sql, entity, function (error, results) {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  },
  //cap nhat giamgia
  patch_gg: function patch_gg(table, entity, condition) {
    return new Promise(function (resolve, reject) {
      var sql = "update giamgia set ? where ?";
      pool.query(sql, [entity, condition], function (error, results) {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  },
  //delete giamgia
  del_gg: function del_gg(table, condition) {
    return new Promise(function (resolve, reject) {
      var sql = "delete from giamgia where ?";
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
  //them nhân viên///////////////////////////
  insert_tk: function insert_tk(table, entity) {
    return new Promise(function (resolve, reject) {
      var sql = "insert into ".concat(tbl_qt, " set ?");
      pool.query(sql, entity, function (error, results) {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  },
  //cap nhat tai khoan nhan vien
  update_tk: function update_tk(table, entity, condition) {
    return new Promise(function (resolve, reject) {
      var sql = "update ".concat(tbl_qt, " set ? where ?");
      pool.query(sql, [entity, condition], function (error, results) {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  },
  //cap nhat trang thai hoadon
  update_hoadon: function update_hoadon(table, entity, condition) {
    return new Promise(function (resolve, reject) {
      var sql = "update ".concat(tbl_hoadon, " set ? where ?");
      pool.query(sql, [entity, condition], function (error, results) {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  },
  //delete tai khoan nhan vien
  delete_tk: function delete_tk(table, condition) {
    return new Promise(function (resolve, reject) {
      var sql = "delete from ".concat(tbl_qt, " where ?");
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
  //them hoadon  thông tin giao hàng//////////////////////////
  insert_hoadon: function insert_hoadon(table, entity) {
    return new Promise(function (resolve, reject) {
      var sql = "insert into ".concat(tbl_hoadon, " set ?");
      pool.query(sql, entity, function (error, results) {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  },
  //them chitiethd 
  insert_chitiethd: function insert_chitiethd(entity) {
    return new Promise(function (resolve, reject) {
      var sql = "insert into ".concat(tbl_chitiethd, "(mahd, masp, tensp, dongia, quantity, gia, ma_id) VALUES ?");
      pool.query(sql, [entity], function (error, results) {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  },
  //cap nhat sanphamct
  patch_spct: function patch_spct(table, entity, condition) {
    return new Promise(function (resolve, reject) {
      var sql = "update sanphamct set ? where ?";
      pool.query(sql, [entity, condition], function (error, results) {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  }
};