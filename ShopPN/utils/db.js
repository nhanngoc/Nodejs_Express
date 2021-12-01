const mysql = require("mysql");
const config = require("../config/default.json");
//kết nối dữ liệu
const tbl_sp = "sanpham";
const tbl_l = "loaisp";
const tbl_tk = "tai_khoan";
const tbl_nv = "nhanvien";
const tbl_kh = "khachhang";
const tbl_order = "hoadon";

const pool = mysql.createPool(config.mysql);

module.exports = {
  load: function (sql) {
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
  insert_pro: function (table, entity) {
    return new Promise(function (resolve, reject) {
      const sql = `insert into ${tbl_sp} set ?`;
      pool.query(sql, entity, function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  //cap nhat products
  update_pro: function (table, entity, condition) {
    return new Promise(function (resolve, reject) {
      const sql = `update ${tbl_sp} set ? where ?`;
      pool.query(sql, [entity,condition], function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  //delete products
  delete_pro: function (table, condition) {
    return new Promise(function (resolve , reject) {
      const sql = `delete from ${tbl_sp} where ?`;
      pool.query(sql, condition, function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },


 //them categories///////////////////////
  insert_loai: function (table, entity) {
    return new Promise(function (resolve, reject) {
      const sql = `insert into ${tbl_l} set ?`;
      pool.query(sql, entity, function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  //cap nhat categories
  update_loai: function (table, entity, condition) {
    return new Promise(function (resolve, reject) {
      const sql = `update ${tbl_l} set ? where ?`;
      pool.query(sql, [entity,condition], function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  //delete categories
  delete_loai: function (table, condition) {
    return new Promise(function (resolve , reject) {
      const sql = `delete from ${tbl_l} where ?`;
      pool.query(sql, condition, function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  
   //them tai khoan///////////////////////////
   insert_tk: function (table, entity) {
    return new Promise(function (resolve, reject) {
      const sql = `insert into ${tbl_tk} set ?`;
      pool.query(sql, entity, function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  //cap nhat tai khoan
  update_tk: function (table, entity, condition) {
    return new Promise(function (resolve, reject) {
      const sql = `update ${tbl_tk} set ? where ?`;
      pool.query(sql, [entity,condition], function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  //delete tai khoan
  delete_tk: function (table, condition) {
    return new Promise(function (resolve , reject) {
      const sql = `delete from ${tbl_tk} where ?`;
      pool.query(sql, condition, function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  //them register khách hàng//////////////////////////
  insert_kh: function (table, entity) {
    return new Promise(function (resolve, reject) {
      const sql = `insert into ${tbl_kh} set ?`;
      pool.query(sql, entity, function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  //cap nhat khách hàng
  update_kh: function (table, entity, condition) {
    return new Promise(function (resolve, reject) {
      const sql = `update ${tbl_kh} set ? where ?`;
      pool.query(sql, [entity,condition], function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  //delete khách hàng
  delete_kh: function (table, condition) {
    return new Promise(function (resolve , reject) {
      const sql = `delete from ${tbl_kh} where ?`;
      pool.query(sql, condition, function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },

  //them order hoadon//////////////////////////
  insert_order: function (table, entity) {
    return new Promise(function (resolve, reject) {
      const sql = `insert into ${tbl_order} set ?`;
      pool.query(sql, entity, function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },

   

}
