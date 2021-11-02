"use strict";

var express = require("express");

var productModel = require("../models/product.model");

var nhanvienModel = require("../models/category.model");

var router = express.Router();
router.get("/", function _callee(req, res) {
  var list;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(productModel.nv());

        case 2:
          list = _context.sent;
          res.render("vwproducts/nv", {
            nhanvien: list,
            empty: list.length === 0
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}); //themn

router.get("/add", function (req, res) {
  res.render("vwproducts/add");
}); //them

router.post("/add", function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(nhanvienModel.add_nv(req.body));

        case 2:
          res.render("vwproducts/add");

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //sua

router.get("/edit/:id", function _callee3(req, res) {
  var id, rows, nv;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = +req.params.id || -1;
          _context3.next = 3;
          return regeneratorRuntime.awrap(nhanvienModel.single_nv(id));

        case 3:
          rows = _context3.sent;
          if (rows.length === 0) res.send("lõi la lõi");
          nv = rows[0];
          res.render("vwproducts/edit", {
            nv: nv
          });

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //xoa

router.post("/del", function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(nhanvienModel.del_nv(req.body.id));

        case 2:
          res.redirect("/admin/nhanvien");

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //cap nhat

router.post("/update", function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(nhanvienModel.patch_nv(req.body));

        case 2:
          res.redirect("/admin/nhanvien");

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
});
module.exports = router;