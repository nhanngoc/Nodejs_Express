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
  }); //lấy ra loại sản phẩm

  var categoryModel = require("../models/category.model");

  app.use(function _callee(req, res, next) {
    var rows;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(categoryModel.allDetails());

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
  });
};