"use strict";

var userModel = require("../models/user.model");

var Model = require("../models/admin_user.model");
/* module.exports = function (req, res, next) {
  if (!req.session.isAuthenticated) {
    return res.redirect(`/account/login?retUrl=${req.originalUrl}`);
  }
  next();
}; */


module.exports = {
  user: function user(req, res, next) {
    var user;
    return regeneratorRuntime.async(function user$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(userModel.singleUserName(req.body.username));

          case 2:
            user = _context.sent;

            if (!(!req.session.isAuthenticated && user != +req.params.username)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.redirect("/account/login?retUrl=".concat(req.originalUrl)));

          case 5:
            next();

          case 6:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  isLoggedIn: function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect('/');
  },
  notLoggedIn: function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }

    res.redirect('/');
  },
  admin: function admin(req, res, next) {
    var user;
    return regeneratorRuntime.async(function admin$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(Model.singleUserName(req.body.username));

          case 2:
            user = _context2.sent;

            if (!(!req.session.isAuthenticated && user != +req.params.username)) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.redirect("/admin/login?retUrl=".concat(req.originalUrl)));

          case 5:
            next();

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};