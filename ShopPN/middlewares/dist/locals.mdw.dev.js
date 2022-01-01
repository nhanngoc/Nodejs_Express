"use strict";

var categoryModel = require("../models/category.model");

var khModel = require("../models/order.model");

var Cart = require("../models/cart");

module.exports = function (app) {
  //login
  app.use(function (req, res, next) {
    if (req.session.isAuthenticated === null) {
      req.session.isAuthenticated = false;
    }

    res.locals.lcIsAuthenticated = req.session.isAuthenticated;
    res.locals.lcAuthUser = req.session.authUser;
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
  });
};