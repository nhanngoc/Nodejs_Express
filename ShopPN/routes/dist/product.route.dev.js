"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var express = require("express");

var productModel = require("../models/product.model");

var config = require("../config/default.json");

var router = express.Router();
router.get("/", function _callee(req, res) {
  var list;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(productModel.all());

        case 2:
          list = _context.sent;
          res.render("vwproducts/list", {
            sanpham: list,
            empty: list.length === 0
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}); //xuat san pham loai

router.get("/byCat/:MaLoai", function _callee2(req, res) {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, c, page, offset, list, total, nPages, page_items, i, item;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          /* 
           const list = await productModel.allByCat(req.params.maLoai);
           //hien thi san pham
           res.render("vwproducts/byCat", {
             sanpham: list,
             empty: list.length === 0,
           }); */
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context2.prev = 3;

          for (_iterator = res.locals.lcCategories[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            c = _step.value;

            if (c.MaLoai === +req.params.MaLoai) {
              c.isActive = true;
            }
          } //phan trang


          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](3);
          _didIteratorError = true;
          _iteratorError = _context2.t0;

        case 11:
          _context2.prev = 11;
          _context2.prev = 12;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 14:
          _context2.prev = 14;

          if (!_didIteratorError) {
            _context2.next = 17;
            break;
          }

          throw _iteratorError;

        case 17:
          return _context2.finish(14);

        case 18:
          return _context2.finish(11);

        case 19:
          page = +req.query.page || 1;
          if (page < 0) page = (_readOnlyError("page"), 1);
          offset = (page - 1) * config.pagination.limit;
          _context2.next = 24;
          return regeneratorRuntime.awrap(productModel.pageByCat(req.params.MaLoai, config.pagination.limit, offset));

        case 24:
          list = _context2.sent;
          _context2.next = 27;
          return regeneratorRuntime.awrap(productModel.countByCat());

        case 27:
          total = _context2.sent;
          nPages = Math.ceil(total / config.pagination.limit);
          page_items = [];

          for (i = 1; i <= nPages; i++) {
            item = {
              value: i,
              isActive: i === page
            };
            page_items.push(item);
          }

          res.render("vwproducts/byCat", {
            sanpham: list,
            empty: list.length === 0,
            page_items: page_items,
            prev_value: page - 1,
            next_value: page + 1
          });

        case 32:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 7, 11, 19], [12,, 14, 18]]);
}); //themn

router.get("/add", function (req, res) {
  res.render("vwproducts/add");
}); //them

router.post("/add", function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(productModel.add(req.body));

        case 2:
          res.render("vwproducts/add");

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.get("/edit/:id", function _callee4(req, res) {
  var id, rows, product;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = +req.params.id || -1;
          _context4.next = 3;
          return regeneratorRuntime.awrap(productModel.single(id));

        case 3:
          rows = _context4.sent;
          if (rows.length === 0) res.send("lõi la lõi");
          product = rows[0];
          res.render("vwproducts/edit", {
            product: product
          });

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
});
router.post("/del", function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(productModel.del(req.body.proID));

        case 2:
          res.redirect("/admin/products");

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
});
router.post("/update", function _callee6(req, res) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(productModel.patch(req.body));

        case 2:
          res.redirect("/admin/products");

        case 3:
        case "end":
          return _context6.stop();
      }
    }
  });
});
module.exports = router;