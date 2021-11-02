const mysql = require("mysql");
const config = require("../config/default.json");
//kết nối dữ liệu
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
   //them categories
   add: function (table, entity) {
    return new Promise(function (resolve, reject) {
      const sql = "insert into categories set ?";
      pool.query(sql, entity, function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
    //them register
    add_user: function (table, entity) {
      return new Promise(function (resolve, reject) {
        const sql = "insert into khachhang set ?";
        pool.query(sql, entity, function (error, results) {
          if (error) {
            return reject(error);
          }
          resolve(results);
        });
      });
    },
  //cap nhat categories
  patch: function (table, entity, condition) {
    return new Promise(function (resolve, reject) {
      const sql = "update categories set ? where ?";
      pool.query(sql, [entity,condition], function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  //delete categories
  del: function (table, condition) {
    return new Promise(function (resolve , reject) {
      const sql = "delete from categories where ?";
      pool.query(sql, condition, function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },

};
