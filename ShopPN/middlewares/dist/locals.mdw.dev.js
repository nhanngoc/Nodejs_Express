"use strict";

var categoryModel = require("../models/category.model");

module.exports = function (app) {
  //login
  app.use(function (req, res, next) {
    if (req.session.isAuthenticated === null) {
      req.session.isAuthenticated = false;
    }

    res.locals.lcIsAuthenticated = req.session.isAuthenticated;
    res.locals.lcAuthUser = req.session.authUser;
    next();
  }); //lấy ra loại danh muc bé gái

  var categoryModel = require("../models/category.model");

  app.use(function _callee(req, res, next) {
    var rows;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(categoryModel.danhmuc0());

          case 2:
            rows = _context.sent;
            res.locals.lcCategories = rows;
            next();

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  }); //lấy ra danh muc bé trai

  app.use(function _callee2(req, res, next) {
    var rows;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(categoryModel.danhmuc1());

          case 2:
            rows = _context2.sent;
            res.locals.lcCategories1 = rows;
            next();

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    });
  }); //lây ra danh muc phụ kiện

  app.use(function _callee3(req, res, next) {
    var rows;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(categoryModel.danhmuc2());

          case 2:
            rows = _context3.sent;
            res.locals.lcCategories2 = rows;
            next();

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    });
  }); //lấy ra color size
};