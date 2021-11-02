"use strict";

var mysql = require("mysql");

var config = require("../config/default.json"); //kết nối dữ liệu


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
  //them categories
  add: function add(table, entity) {
    return new Promise(function (resolve, reject) {
      var sql = "insert into categories set ?";
      pool.query(sql, entity, function (error, results) {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  },
  //them register
  add_user: function add_user(table, entity) {
    return new Promise(function (resolve, reject) {
      var sql = "insert into khachhang set ?";
      pool.query(sql, entity, function (error, results) {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  },
  //cap nhat categories
  patch: function patch(table, entity, condition) {
    return new Promise(function (resolve, reject) {
      var sql = "update categories set ? where ?";
      pool.query(sql, [entity, condition], function (error, results) {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  },
  //delete categories
  del: function del(table, condition) {
    return new Promise(function (resolve, reject) {
      var sql = "delete from categories where ?";
      pool.query(sql, condition, function (error, results) {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  }
};