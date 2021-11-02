"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var express = require("express");

var productModel = require("../models/product.model");

var config = require("../config/default.json");

var router = express.Router();
router.get("/", function _callee(req, res) {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, c, page, offset, list, total, nPages, page_items, i, item;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 3;

          for (_iterator = res.locals.lcCategories[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            c = _step.value;

            if (c.MaLoai === +req.params.MaLoai) {
              c.isActive = true;
            }
          } // const list = await productModel.allByCat(req.params.catId);
          //phan trang


          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](3);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 11:
          _context.prev = 11;
          _context.prev = 12;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 14:
          _context.prev = 14;

          if (!_didIteratorError) {
            _context.next = 17;
            break;
          }

          throw _iteratorError;

        case 17:
          return _context.finish(14);

        case 18:
          return _context.finish(11);

        case 19:
          page = +req.query.page || 1;
          if (page < 0) page = (_readOnlyError("page"), 1);
          offset = (page - 1) * config.pagination.limit;
          _context.next = 24;
          return regeneratorRuntime.awrap(productModel.pageByHome(req.params.MaLoai, config.pagination.limit, offset));

        case 24:
          list = _context.sent;
          _context.next = 27;
          return regeneratorRuntime.awrap(productModel.countByCat());

        case 27:
          total = _context.sent;
          nPages = Math.ceil(total / config.pagination.limit);
          page_items = [];

          for (i = 1; i <= nPages; i++) {
            item = {
              value: i,
              isActive: i === page
            };
            page_items.push(item);
          }

          res.render("home", {
            sanpham: list,
            empty: list.length === 0,
            page_items: page_items,
            prev_value: page - 1,
            next_value: page + 1
          });

        case 32:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 7, 11, 19], [12,, 14, 18]]);
});
/* 
//tim kiem
router.get("/search", async function (req, res) {
  const product = await productModel.all();
  const proName = req.query.proName;
  const data = product.filter(function (item) {
    let a = proName.toLowerCase();
    return item.proName.indexOf(a) > -1;
  });

  res.render("home", {
    products: data,
    empty: data.length === 0,
  });
});
 */

module.exports = router;