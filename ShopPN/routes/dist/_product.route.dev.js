"use strict";

var express = require("express");

var productModel = require("../models/product.model");

var config = require("../config/default.json");

var router = express.Router();
router.get("/byCat/:catId", function _callee(req, res) {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, c, offset, limit, list;

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

            if (c.CatID === +req.params.catId) {
              c.isActive = true;
            }
          } // const list = await productModel.allByCat(req.params.catId);
          //phan trang

          /* const page = parseInt(req.query.page || 1)
            if (page < 0) page = 1;
          const offset = (page - 1) * config.pagination.limit;
          const list = await productModel.pageByCat(
            req.params.catId,
            config.pagination.limit,
            offset
          );
            const total = await productModel.countByCat(req.params.catId);
          const nPages = Math.ceil(total / config.pagination.limit);
          const page_items = [];
          for (let i = 1; i <= nPages; i++) {
            const item = {
              value: i,
              isActive: i === page,
            };
            page_items.push(item);
          }*/


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
          offset = 0;
          limit = 6;
          _context.next = 23;
          return regeneratorRuntime.awrap(productModel.pageByCat(req.params.catId, limit, offset));

        case 23:
          list = _context.sent;
          //hien thi san pham
          res.render("vwproducts/byCat", {
            products: list,
            empty: list.length === 0
            /*page_items,
            prev_value: page - 1,
            next_value: page + 1,*/

          });

        case 25:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 7, 11, 19], [12,, 14, 18]]);
});
module.exports = router;