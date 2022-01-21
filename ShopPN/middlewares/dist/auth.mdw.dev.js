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

    res.redirect("/");
  },
  notLoggedIn: function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }

    res.redirect("/");
  },
  //PHÂN QUYỀN
  admin: function admin(req, res, next) {
    var user, i;
    return regeneratorRuntime.async(function admin$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(Model.singleUserName_ad(req.body.username));

          case 2:
            user = _context2.sent;

            if (req.session.isAuthenticated) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.redirect("/admin/login?retUrl=".concat(req.originalUrl)));

          case 5:
            i = 0;

          case 6:
            if (!(i < user.length)) {
              _context2.next = 13;
              break;
            }

            if (!(user[i].username === req.session.authUser.username)) {
              _context2.next = 10;
              break;
            }

            next();
            return _context2.abrupt("return");

          case 10:
            i++;
            _context2.next = 6;
            break;

          case 13:
            //console.log("req.session", req.session.isAuthenticated);
            res.redirect("/admin/login?retUrl=".concat(req.originalUrl));

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  //PHÂN QUYỀN
  admin_nhanvien: function admin_nhanvien(req, res, next) {
    var user, i;
    return regeneratorRuntime.async(function admin_nhanvien$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(Model.singleUserName_all(req.body.username));

          case 2:
            user = _context3.sent;

            if (req.session.isAuthenticated) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", res.redirect("/admin/login?retUrl=".concat(req.originalUrl)
            /* {
              err:"Bạn không có quyền truy cập"
            } */
            ));

          case 5:
            i = 0;

          case 6:
            if (!(i < user.length)) {
              _context3.next = 13;
              break;
            }

            if (!(user[i].username === req.session.authUser.username)) {
              _context3.next = 10;
              break;
            }

            next();
            return _context3.abrupt("return");

          case 10:
            i++;
            _context3.next = 6;
            break;

          case 13:
            res.redirect("/admin/login?retUrl=".concat(req.originalUrl)
            /* {
              err:"Bạn không có quyền truy cập"
            } */
            );

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    });
  }
};