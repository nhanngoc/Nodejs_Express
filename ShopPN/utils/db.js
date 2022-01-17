const mysql = require("mysql");
const config = require("../config/default.json");
//kết nối dữ liệu
const tbl_sp = "sanpham";
const tbl_spct = "sanphamct";
const tbl_l = "loaisp";
const tbl_qt = "quantri";
const tbl_kh = "khachhang";
const tbl_hoadon = "hoadon";
const tbl_chitiethd = "chitiethd";

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
  //them attribute sanphamct/////////////////////
  insert_attr: function (entity) {
    return new Promise(function (resolve, reject) {
      const sql = `insert into ${tbl_spct}(masp, color_id, size_id,soluong) VALUES ?`;
      pool.query(sql, [entity], function (error, results) {
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
   //them nhieu hinh anh anhct/////////////////////
   insert_mutilfile: function (entity) {
    return new Promise(function (resolve, reject) {
      const sql = `insert into anhct(MaSP, anh_ten) VALUES ?`;
      pool.query(sql, [entity], function (error, results) {
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
      pool.query(sql, [entity, condition], function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  //cap nhat products attribute
  update_attr: function (table, entity, condition) {
    return new Promise(function (resolve, reject) {
      const sql = `update ${tbl_sp} set ? where ?`;
      pool.query(sql, [entity, condition], function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  //cap nhat products attribute
  update_attr_detail: function (table, entity, condition) {
    return new Promise(function (resolve, reject) {
      const sql = `update ${tbl_spct} set ? where ?`;
      pool.query(sql, [entity, condition], function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  //delete products
  delete_pro: function (table, condition) {
    return new Promise(function (resolve, reject) {
      const sql = `delete from ${tbl_sp} where ?`;
      pool.query(sql, condition, function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  //them giamgia /////////////////////
  insert_gg: function (table, entity) {
    return new Promise(function (resolve, reject) {
      const sql = `insert into giamgia set ?`;
      pool.query(sql, entity, function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  //cap nhat giamgia
  patch_gg: function (table, entity, condition) {
    return new Promise(function (resolve, reject) {
      const sql = "update giamgia set ? where ?";
      pool.query(sql, [entity,condition], function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  //delete giamgia
  del_gg: function (table, condition) {
    return new Promise(function (resolve , reject) {
      const sql = "delete from giamgia where ?";
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
      pool.query(sql, [entity, condition], function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  //delete categories
  delete_loai: function (table, condition) {
    return new Promise(function (resolve, reject) {
      const sql = `delete from ${tbl_l} where ?`;
      pool.query(sql, condition, function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },

  //them nhân viên///////////////////////////
  insert_tk: function (table, entity) {
    return new Promise(function (resolve, reject) {
      const sql = `insert into ${tbl_qt} set ?`;
      pool.query(sql, entity, function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  //cap nhat tai khoan nhan vien
  update_tk: function (table, entity, condition) {
    return new Promise(function (resolve, reject) {
      const sql = `update ${tbl_qt} set ? where ?`;
      pool.query(sql, [entity, condition], function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  //cap nhat trang thai hoadon
  update_hoadon: function (table, entity, condition) {
    return new Promise(function (resolve, reject) {
      const sql = `update ${tbl_hoadon} set ? where ?`;
      pool.query(sql, [entity, condition], function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  //delete tai khoan nhan vien
  delete_tk: function (table, condition) {
    return new Promise(function (resolve, reject) {
      const sql = `delete from ${tbl_qt} where ?`;
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
      pool.query(sql, [entity, condition], function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  //delete khách hàng
  delete_kh: function (table, condition) {
    return new Promise(function (resolve, reject) {
      const sql = `delete from ${tbl_kh} where ?`;
      pool.query(sql, condition, function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },

  //them hoadon  thông tin giao hàng//////////////////////////
  insert_hoadon: function (table, entity) {
    return new Promise(function (resolve, reject) {
      const sql = `insert into ${tbl_hoadon} set ?`;
      pool.query(sql, entity, function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },

  //them chitiethd 
  insert_chitiethd: function (entity) {
    return new Promise(function (resolve, reject) {
      const sql = `insert into ${tbl_chitiethd}(mahd, masp, tensp, dongia, quantity, gia, ma_id) VALUES ?`;
      pool.query(sql, [entity], function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  //cap nhat sanphamct
  patch_spct: function (table, entity, condition) {
    return new Promise(function (resolve, reject) {
      const sql = "update sanphamct set ? where ?";
      pool.query(sql, [entity,condition], function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },

};
