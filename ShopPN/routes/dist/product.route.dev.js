"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var express = require("express");

var productModel = require("../models/product.model");

var config = require("../config/default.json");

var router = express.Router(); //xuat danh sach san pham

router.get("/list", function _callee(req, res) {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, c, page, offset, list, total, nPages, page_items, i, item;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          //const list = await productModel.all();
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 3;

          for (_iterator = res.locals.lcCategories[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            c = _step.value;

            if (c.MaLoai === +req.params.MaLoai) {
              c.isActive = true;
            }
          } //phan trang


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

          res.render("vwproducts/list", {
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
}); //detail

router.get("/detail/:MaSP", function _callee2(req, res) {
  var id, product, lists, color, size, distinct_size, detail_anh, page_items, i, cc, j, itemi;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.MaSP;
          _context2.next = 3;
          return regeneratorRuntime.awrap(productModel.detail_ct(id));

        case 3:
          product = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(productModel.detail(id));

        case 6:
          lists = _context2.sent;
          _context2.next = 9;
          return regeneratorRuntime.awrap(productModel.distinct_color(id));

        case 9:
          color = _context2.sent;
          _context2.next = 12;
          return regeneratorRuntime.awrap(productModel.detail_size(id));

        case 12:
          size = _context2.sent;
          _context2.next = 15;
          return regeneratorRuntime.awrap(productModel.distinct_size(id));

        case 15:
          distinct_size = _context2.sent;
          _context2.next = 18;
          return regeneratorRuntime.awrap(productModel.detail_anh(id));

        case 18:
          detail_anh = _context2.sent;
          page_items = [];

          for (i = 0; i < color.length; i++) {
            if (color[i].color_id >= 0) {
              cc = [];

              for (j = 0; j < size.length; j++) {
                if (color[i].color_id == size[j].color_id) {
                  cc.push(size[j]);
                }
              }

              itemi = {
                code: color[i],

                /* isActive: color[i].color_id===cc.color_id, */
                items: cc
              };
              console.log("itemi", itemi);
              page_items.push(itemi); // Thêm phần tử vào cuối mảng mới
            }
          }

          console.log("iiiiiidetail2222", page_items);
          res.render("vwproducts/detail", {
            layout: false,
            detail_anh: detail_anh,
            sanpham: lists,
            page_items: page_items,
            empty: lists.length === 0,
            sizes: distinct_size
          });

        case 23:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //xuat san pham loai

router.get("/danhmuc0/:MaLoai", function _callee3(req, res) {
  var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, c, page, offset, list, total, nPages, page_items, i, item;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context3.prev = 3;

          for (_iterator2 = res.locals.lcCategories[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            c = _step2.value;

            if (c.MaLoai === +req.params.MaLoai) {
              c.isActive = true;
            }
          } //phan trang


          _context3.next = 11;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](3);
          _didIteratorError2 = true;
          _iteratorError2 = _context3.t0;

        case 11:
          _context3.prev = 11;
          _context3.prev = 12;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 14:
          _context3.prev = 14;

          if (!_didIteratorError2) {
            _context3.next = 17;
            break;
          }

          throw _iteratorError2;

        case 17:
          return _context3.finish(14);

        case 18:
          return _context3.finish(11);

        case 19:
          page = +req.query.page || 1;
          if (page < 0) page = (_readOnlyError("page"), 1);
          offset = (page - 1) * config.pagination.limit;
          _context3.next = 24;
          return regeneratorRuntime.awrap(productModel.pageByCat(req.params.MaLoai, config.pagination.limit, offset));

        case 24:
          list = _context3.sent;
          _context3.next = 27;
          return regeneratorRuntime.awrap(productModel.countByLoai(req.params.MaLoai));

        case 27:
          total = _context3.sent;
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
          return _context3.stop();
      }
    }
  }, null, null, [[3, 7, 11, 19], [12,, 14, 18]]);
}); //xuat san pham loai

router.get("/danhmuc1/:MaLoai", function _callee4(req, res) {
  var _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, c, page, offset, list, total, nPages, page_items, i, item;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _iteratorNormalCompletion3 = true;
          _didIteratorError3 = false;
          _iteratorError3 = undefined;
          _context4.prev = 3;

          for (_iterator3 = res.locals.lcCategories1[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            c = _step3.value;

            if (c.MaLoai === +req.params.MaLoai) {
              c.isActive = true;
            }
          } //phan trang


          _context4.next = 11;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](3);
          _didIteratorError3 = true;
          _iteratorError3 = _context4.t0;

        case 11:
          _context4.prev = 11;
          _context4.prev = 12;

          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }

        case 14:
          _context4.prev = 14;

          if (!_didIteratorError3) {
            _context4.next = 17;
            break;
          }

          throw _iteratorError3;

        case 17:
          return _context4.finish(14);

        case 18:
          return _context4.finish(11);

        case 19:
          page = +req.query.page || 1;
          if (page < 0) page = (_readOnlyError("page"), 1);
          offset = (page - 1) * config.pagination.limit;
          _context4.next = 24;
          return regeneratorRuntime.awrap(productModel.pageByCat(req.params.MaLoai, config.pagination.limit, offset));

        case 24:
          list = _context4.sent;
          _context4.next = 27;
          return regeneratorRuntime.awrap(productModel.countByLoai(req.params.MaLoai));

        case 27:
          total = _context4.sent;
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
          return _context4.stop();
      }
    }
  }, null, null, [[3, 7, 11, 19], [12,, 14, 18]]);
}); //xuat san pham loai

router.get("/danhmuc2/:MaLoai", function _callee5(req, res) {
  var _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, c, page, offset, list, total, nPages, page_items, i, item;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _iteratorNormalCompletion4 = true;
          _didIteratorError4 = false;
          _iteratorError4 = undefined;
          _context5.prev = 3;

          for (_iterator4 = res.locals.lcCategories2[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            c = _step4.value;

            if (c.MaLoai === +req.params.MaLoai) {
              c.isActive = true;
            }
          } //phan trang


          _context5.next = 11;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](3);
          _didIteratorError4 = true;
          _iteratorError4 = _context5.t0;

        case 11:
          _context5.prev = 11;
          _context5.prev = 12;

          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }

        case 14:
          _context5.prev = 14;

          if (!_didIteratorError4) {
            _context5.next = 17;
            break;
          }

          throw _iteratorError4;

        case 17:
          return _context5.finish(14);

        case 18:
          return _context5.finish(11);

        case 19:
          page = +req.query.page || 1;
          if (page < 0) page = (_readOnlyError("page"), 1);
          offset = (page - 1) * config.pagination.limit;
          _context5.next = 24;
          return regeneratorRuntime.awrap(productModel.pageByCat(req.params.MaLoai, config.pagination.limit, offset));

        case 24:
          list = _context5.sent;
          _context5.next = 27;
          return regeneratorRuntime.awrap(productModel.countByLoai(req.params.MaLoai));

        case 27:
          total = _context5.sent;
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
          return _context5.stop();
      }
    }
  }, null, null, [[3, 7, 11, 19], [12,, 14, 18]]);
});
module.exports = router;