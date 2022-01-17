"use strict";

var categoryModel = require("../models/category.model");

var khModel = require("../models/order.model");

var Cart = require("../models/cart");

var adminModel = require("../models/admin_user.model");

module.exports = function (app) {
  //login
  app.use(function (req, res, next) {
    if (req.session.isAuthenticated === null) {
      req.session.isAuthenticated = false;
    }

    res.locals.lcIsAuthenticated = req.session.isAuthenticated; //console.log("lcIsAuthenticated",res.locals.lcIsAuthenticated)

    res.locals.lcAuthUser = req.session.authUser; //console.log("lcAuthUser",res.locals.lcAuthUser)

    next();
  }); //lấy ra danh sách tài khoản khách hàng

  app.use(function _callee(req, res, next) {
    var rows;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(khModel.all_khanhhang());

          case 2:
            rows = _context.sent;
            res.locals.khachhang = rows;
            next();

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  }); //lấy ra loại danh muc bé gái

  var categoryModel = require("../models/category.model");

  app.use(function _callee2(req, res, next) {
    var rows;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(categoryModel.danhmuc0());

          case 2:
            rows = _context2.sent;
            res.locals.lcCategories = rows;
            next();

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    });
  }); //lấy ra danh muc bé trai

  app.use(function _callee3(req, res, next) {
    var rows;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(categoryModel.danhmuc1());

          case 2:
            rows = _context3.sent;
            res.locals.lcCategories1 = rows;
            next();

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    });
  }); //lây ra danh muc phụ kiện

  app.use(function _callee4(req, res, next) {
    var rows;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(categoryModel.danhmuc2());

          case 2:
            rows = _context4.sent;
            res.locals.lcCategories2 = rows;
            next();

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    });
  }); //lấy ra size

  var sizeModel = require("../models/product.model");

  app.use(function _callee5(req, res, next) {
    var rows;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap(sizeModel.size());

          case 2:
            rows = _context5.sent;
            res.locals.sizes = rows;
            next();

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    });
  }); ////Start ADMIN ////
  //lấy ra hóa đơn choxacnhan bên admin

  app.use(function _callee6(req, res, next) {
    var list, count, i;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return regeneratorRuntime.awrap(adminModel.single_choxacnhan());

          case 2:
            list = _context6.sent;
            count = 0;

            for (i = 0; i < list.length; i++) {
              count++;
            }

            res.locals.choxacnhan = count; //console.log("choxacnhan",res.locals.choxacnhan)

            next();

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    });
  }); //lấy ra hóa đơn daxacnhan bên admin

  app.use(function _callee7(req, res, next) {
    var list, count, i;
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return regeneratorRuntime.awrap(adminModel.single_daxacnhan());

          case 2:
            list = _context7.sent;
            count = 0;

            for (i = 0; i < list.length; i++) {
              count++;
            }

            res.locals.daxacnhan = count;
            next();

          case 7:
          case "end":
            return _context7.stop();
        }
      }
    });
  }); //lấy ra hóa đơn danggiao bên admin

  app.use(function _callee8(req, res, next) {
    var list, count, i;
    return regeneratorRuntime.async(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return regeneratorRuntime.awrap(adminModel.single_danggiao());

          case 2:
            list = _context8.sent;
            count = 0;

            for (i = 0; i < list.length; i++) {
              count++;
            }

            res.locals.danggiao = count;
            next();

          case 7:
          case "end":
            return _context8.stop();
        }
      }
    });
  }); //lấy ra hóa đơn danhan bên admin

  app.use(function _callee9(req, res, next) {
    var list, count, i;
    return regeneratorRuntime.async(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return regeneratorRuntime.awrap(adminModel.single_danhan());

          case 2:
            list = _context9.sent;
            count = 0;

            for (i = 0; i < list.length; i++) {
              count++;
            }

            res.locals.danhan = count;
            next();

          case 7:
          case "end":
            return _context9.stop();
        }
      }
    });
  }); //lấy ra hóa đơn dahuy bên admin

  app.use(function _callee10(req, res, next) {
    var list, count, i;
    return regeneratorRuntime.async(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return regeneratorRuntime.awrap(adminModel.single_dahuy());

          case 2:
            list = _context10.sent;
            count = 0;

            for (i = 0; i < list.length; i++) {
              count++;
            }

            res.locals.dahuy = count;
            next();

          case 7:
          case "end":
            return _context10.stop();
        }
      }
    });
  });
};