"use strict";

var express = require("express");

var moment = require("moment");

var bcrypt = require("bcryptjs");

var Model = require("../models/admin_user.model");

var config = require("../config/default.json");

var multer = require("multer"); //register
//const {validationResult} = require('express-validator');


var _require = require("../middlewares/validate.mdw"),
    registerValidator = _require.registerValidator; //login//logout


var restrict = require("../middlewares/auth.mdw");

var router = express.Router(); //login

router.get("/", function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.render("vwadmin/login", {
            layout: false
          }); //tat layout trang chu

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post("/", function _callee2(req, res) {
  var user, rs, url;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Model.singleUserName(req.body.username));

        case 2:
          user = _context2.sent;

          if (!(user === null)) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", res.render("vwadmin/login", {
            layout: false,
            err: "Invalid username or password."
          }));

        case 5:
          rs = bcrypt.compareSync(req.body.password, user.password);

          if (!(rs === false)) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", res.render("vwadmin/login", {
            layout: false,
            err: "Invalid username or password."
          }));

        case 8:
          delete user.password;
          req.session.isAuthenticated = true;
          req.session.authUser = user;
          url = req.query.retUrl || "/admin/home";
          res.redirect(url);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //logout

router.post("/logoutadmin", restrict.admin, function (req, res) {
  req.session.isAuthenticated = false;
  req.session.authUser = null;
  res.redirect("/admin");
}); //
//
//home admin

router.get("/home", restrict.admin, function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log(req.session.authUser);
          res.render("_layouts/admin", {
            layout: false
          }); //tat layout trang chu

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
});
/* router.get("/is-available", async function (req, res) {
 const user = await Model.singleUserName(req.query.user);
  if(!user){
    return res.json(true);
  }
  res.json(false);
}); */
////////////////products////////////////
//list 

router.get("/products/list", restrict.admin, function _callee4(req, res) {
  var list;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Model.all_products());

        case 2:
          list = _context4.sent;
          res.render("vwadmin/products/list", {
            layout: "admin",
            sanpham: list,
            empty: list.length === 0
          });

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //them upload_sp.route.js
//xoa

router.get("/products/remove/:id", function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Model.remove(req.params.id));

        case 2:
          res.redirect("/admin/products/list");

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
}); //sua

router.get("/products/edit/:id", restrict.admin, function _callee6(req, res) {
  var id, rows, product;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          id = +req.params.id || -1;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Model.single(id));

        case 3:
          rows = _context6.sent;
          if (rows.length === 0) res.send("lõi la lõi");
          product = rows[0];

          if (req.files) {
            _context6.next = 8;
            break;
          }

          return _context6.abrupt("return", res.render("vwadmin/products/edit", {
            layout: "admin",
            product: product
          }));

        case 8:
        case "end":
          return _context6.stop();
      }
    }
  });
}); //cap nhat

router.post("/products/update", restrict.admin, function _callee7(req, res) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(Model.patch(req.body));

        case 2:
          res.redirect("/admin/products/list");

        case 3:
        case "end":
          return _context7.stop();
      }
    }
  });
}); ////////////////category////////////////
//list 

router.get("/category/list", restrict.admin, function _callee8(req, res) {
  var list;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(Model.all_category());

        case 2:
          list = _context8.sent;
          res.render("vwadmin/categories/list", {
            layout: "admin",
            loaisp: list,
            empty: list.length === 0
          });

        case 4:
        case "end":
          return _context8.stop();
      }
    }
  });
}); ////////////////khách hàng////////////////
//list kh

router.get("/kh", restrict.admin, function _callee9(req, res) {
  var list;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(Model.all_kh());

        case 2:
          list = _context9.sent;
          res.render("vwadmin/order/kh", {
            layout: "admin",
            khachhang: list,
            empty: list.length === 0
          });

        case 4:
        case "end":
          return _context9.stop();
      }
    }
  });
}); ////////////////tai khoan admin////////////////
//list taikhoan

router.get("/user", restrict.admin, function _callee10(req, res) {
  var list;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(Model.all_tk());

        case 2:
          list = _context10.sent;
          res.render("vwadmin/taikhoan/user", {
            layout: "admin",
            tai_khoan: list,
            empty: list.length === 0
          });

        case 4:
        case "end":
          return _context10.stop();
      }
    }
  });
});
module.exports = router;