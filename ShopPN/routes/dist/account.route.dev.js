"use strict";

var express = require("express");

var moment = require("moment");

var Joi = require("joi");

var bcrypt = require("bcryptjs");

var userModel = require("../models/user.model");

var config = require("../config/default.json");

var orderModel = require("../models/order.model");

var Cart = require("../models/cart"); //register
//const {validationResult} = require('express-validator');


var _require = require("../middlewares/validate.mdw"),
    registerValidator = _require.registerValidator; //login//logout


var restrict = require("../middlewares/auth.mdw");

var router = express.Router();
router.get("/login", function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.render("vwaccount/login"); //tat layout trang chu

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post("/login", function _callee2(req, res) {
  var user, rs, url;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(userModel.singleUserName(req.body.username));

        case 2:
          user = _context2.sent;

          if (!(user === null)) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", res.render("vwaccount/login", {
            layout: false,
            err: "Invalid username or password."
          }));

        case 5:
          rs = bcrypt.compareSync(req.body.password, user.password);

          if (!(rs === false)) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", res.render("vwaccount/login", {
            layout: false,
            err: "Invalid username or password."
          }));

        case 8:
          delete user.password;
          req.session.isAuthenticated = true;
          req.session.authUser = user;
          url = req.query.retUrl || "/"; //res.redirect(req.headers.referer);

          res.redirect(url);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //logout

router.post("/logout", restrict.user, function (req, res) {
  req.session.isAuthenticated = false;
  req.session.authUser = null;
  res.redirect(req.headers.referer);
}); //register

router.get("/register", function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res.render("vwaccount/register");

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //register, response request

router.post("/register", function _callee4(req, res, next) {
  var _registerValidator, error, value, user, ero, salt, password_hash, entity;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _registerValidator = registerValidator(req.body), error = _registerValidator.error, value = _registerValidator.value; // validate

          _context4.next = 3;
          return regeneratorRuntime.awrap(userModel.singleUserName(req.body.username));

        case 3:
          user = _context4.sent;

          if (!(user === +req.params.username)) {
            _context4.next = 7;
            break;
          }

          ero = "Tên tài khoản đã tồn tại";
          return _context4.abrupt("return", res.redirect("/account/register", {
            ero: ero
          }));

        case 7:
          salt = bcrypt.genSaltSync(10);
          password_hash = bcrypt.hashSync(req.body.password, salt);
          entity = {
            tenkh: req.body.tenkh,
            username: req.body.username,
            password: password_hash,
            email: req.body.email,
            sdt: req.body.sdt,
            phuong_xa: req.body.phuong_xa,
            quan_huyen: req.body.quan_huyen,
            tinh: req.body.tinh,
            diachi: req.body.diachi
          };
          _context4.next = 12;
          return regeneratorRuntime.awrap(userModel.add_kh(entity));

        case 12:
          // luu database
          res.render("vwaccount/register");

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //login profile

/* router.get("/profile", restrict.user, async function (req, res) {
  console.log(req.session.authUser);
  res.render("vwaccount/profile");
}); */
//login profile

router.get("/profile", restrict.user, function _callee5(req, res) {
  var makh, total1, total2, total3, total4, total5;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          user = req.session.authUser;
          makh = user.MaKH;
          _context5.next = 4;
          return regeneratorRuntime.awrap(orderModel.total_choxacnhan(makh));

        case 4:
          total1 = _context5.sent;
          _context5.next = 7;
          return regeneratorRuntime.awrap(orderModel.total_daxacnhan(makh));

        case 7:
          total2 = _context5.sent;
          _context5.next = 10;
          return regeneratorRuntime.awrap(orderModel.total_danggiao(makh));

        case 10:
          total3 = _context5.sent;
          _context5.next = 13;
          return regeneratorRuntime.awrap(orderModel.total_danhanhang(makh));

        case 13:
          total4 = _context5.sent;
          _context5.next = 16;
          return regeneratorRuntime.awrap(orderModel.total_dahuy(makh));

        case 16:
          total5 = _context5.sent;
          res.render("vwaccount/profile", {
            user: user,
            total1: total1,
            total2: total2,
            total3: total3,
            total4: total4,
            total5: total5
          });
          /* Order.all(console.log("aaaaaaaaaaa",{ user: req.session.authUser}), function (err, orders) {
              if (err) {
                return res.write("Error!");
              } 
              let cart;
              orders.forEach(function (order) {
                cart = new Cart(order.cart);
                order.items = cart.getItems();
              });
              res.render("vwaccount/profile", { orders: orders });
            }); */

        case 18:
        case "end":
          return _context5.stop();
      }
    }
  });
});
/* router.get("/is-available", async function (req, res) {
 const user = await userModel.singleUserName(req.query.user);
  if(!user){
    return res.json(true);
  }
  res.json(false);
}); */
//xem danh sách đơn đặt hàng

router.get("/profile/order", restrict.user, function _callee6(req, res) {
  var user, makh, order;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          user = req.session.authUser;
          console.log("khachhang", user);
          makh = user.MaKH;
          _context6.next = 5;
          return regeneratorRuntime.awrap(orderModel.all_order_makh(makh));

        case 5:
          order = _context6.sent;
          console.log("order", order);
          res.render("vwaccount/order", {
            order: order
          });

        case 8:
        case "end":
          return _context6.stop();
      }
    }
  });
}); //xem danh sách chi tiết đơn đặt hàng

router.get("/profile/order/:id", restrict.user, function _callee7(req, res) {
  var mahd, user, order_mahd, order_detail;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          mahd = req.params.id;
          user = req.session.authUser;
          _context7.next = 4;
          return regeneratorRuntime.awrap(orderModel.all_order_mahd(mahd));

        case 4:
          order_mahd = _context7.sent;
          _context7.next = 7;
          return regeneratorRuntime.awrap(orderModel.all_order_ct(mahd));

        case 7:
          order_detail = _context7.sent;
          console.log("order_detail", order_detail);
          res.render("vwaccount/order_detail", {
            order_detail: order_detail,
            order_mahd: order_mahd
          });

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  });
}); //1xem danh sách choxacnhan đơn đặt hàng

router.get("/profile/choxacnhan", restrict.user, function _callee8(req, res) {
  var user, makh, order, total, i;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          user = req.session.authUser;
          makh = user.MaKH;
          _context8.next = 4;
          return regeneratorRuntime.awrap(orderModel.all_order_choxacnhan(makh));

        case 4:
          order = _context8.sent;
          total = 0;

          for (i = 0; i < order.length; i++) {
            total++;
          }

          res.render("vwaccount/order_huy", {
            order: order,
            total: total
          });

        case 8:
        case "end":
          return _context8.stop();
      }
    }
  });
}); //huydon tu khach hang

router.get("/profile/dahuy/:mahd", restrict.user, function _callee9(req, res) {
  var mahd, entity;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          mahd = req.params.mahd;
          entity = {
            mahd: mahd,
            trangthai: "Đã hủy"
          };
          console.log("entity", entity);
          _context9.next = 5;
          return regeneratorRuntime.awrap(orderModel.update_hd(entity));

        case 5:
          res.redirect("/account/profile/choxacnhan");

        case 6:
        case "end":
          return _context9.stop();
      }
    }
  });
}); //2xem danh sách daxacnhan đơn đặt hàng

router.get("/profile/daxacnhan", restrict.user, function _callee10(req, res) {
  var user, makh, order, total, i;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          user = req.session.authUser;
          makh = user.MaKH;
          _context10.next = 4;
          return regeneratorRuntime.awrap(orderModel.all_order_daxacnhan(makh));

        case 4:
          order = _context10.sent;
          total = 0;

          for (i = 0; i < order.length; i++) {
            total++;
          }

          res.render("vwaccount/order_tt", {
            order: order,
            total: total
          });

        case 8:
        case "end":
          return _context10.stop();
      }
    }
  });
}); //3xem danh sách danggiao đơn đặt hàng

router.get("/profile/danggiao", restrict.user, function _callee11(req, res) {
  var user, makh, order, total, i;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          user = req.session.authUser;
          makh = user.MaKH;
          _context11.next = 4;
          return regeneratorRuntime.awrap(orderModel.all_order_danggiao(makh));

        case 4:
          order = _context11.sent;
          total = 0;

          for (i = 0; i < order.length; i++) {
            total++;
          }

          res.render("vwaccount/order_tt", {
            order: order,
            total: total
          });

        case 8:
        case "end":
          return _context11.stop();
      }
    }
  });
}); //4xem danh sách danhanhang đơn đặt hàng

router.get("/profile/danhan", restrict.user, function _callee12(req, res) {
  var user, makh, order, total, i;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          user = req.session.authUser;
          makh = user.MaKH;
          _context12.next = 4;
          return regeneratorRuntime.awrap(orderModel.all_order_danhanhang(makh));

        case 4:
          order = _context12.sent;
          total = 0;

          for (i = 0; i < order.length; i++) {
            total++;
          }

          res.render("vwaccount/order_tt", {
            order: order,
            total: total
          });

        case 8:
        case "end":
          return _context12.stop();
      }
    }
  });
}); //5xem danh sách dahuy đơn đặt hàng

router.get("/profile/dahuy", restrict.user, function _callee13(req, res) {
  var user, makh, order, total, i;
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          user = req.session.authUser;
          makh = user.MaKH;
          _context13.next = 4;
          return regeneratorRuntime.awrap(orderModel.all_order_dahuy(makh));

        case 4:
          order = _context13.sent;
          total = 0;

          for (i = 0; i < order.length; i++) {
            total++;
          }

          res.render("vwaccount/order_tt", {
            order: order,
            total: total
          });

        case 8:
        case "end":
          return _context13.stop();
      }
    }
  });
});
module.exports = router;