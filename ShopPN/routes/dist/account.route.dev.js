"use strict";

var express = require("express");

var moment = require("moment");

var bcrypt = require("bcryptjs");

var userModel = require("../models/user.model");

var config = require("../config/default.json"); //register
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
          res.render("vwaccount/login", {
            layout: false
          }); //tat layout trang chu

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
          url = req.query.retUrl || "/";
          res.redirect(url);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //logout

router.post("/logout", restrict, function (req, res) {
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
}); //response request

router.post("/register", function _callee4(req, res) {
  var _registerValidator, error, salt, password_hash, entity;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _registerValidator = registerValidator(req.body), error = _registerValidator.error;

          if (!error) {
            _context4.next = 3;
            break;
          }

          return _context4.abrupt("return", res.status(422).send(error.details[0].message));

        case 3:
          //const checkEmailExist = await userModel.findOne({ email: req.body.email });
          //if (checkEmailExist) return res.status(422).send('Email is exist');
          salt = bcrypt.genSaltSync(10);
          password_hash = bcrypt.hashSync(req.body.password, salt);
          entity = {
            tenkh: req.body.tenkh,
            username: req.body.username,
            password: password_hash,
            email: req.body.email // gioitinh: req.body.gioitinh,
            // diachi: req.body.diachi,
            // sdt: req.body.sdt,

          };
          _context4.prev = 6;
          _context4.next = 9;
          return regeneratorRuntime.awrap(userModel.add(entity));

        case 9:
          //đẩy database
          res.render("vwaccount/register");
          _context4.next = 15;
          break;

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](6);
          res.status(400).send(_context4.t0);

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[6, 12]]);
}); //login

router.get("/profile", restrict, function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          console.log(req.session.authUser);
          res.render("vwaccount/profile");

        case 2:
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

module.exports = router;