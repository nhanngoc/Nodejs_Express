"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var express = require("express");

var productModel = require("../models/product.model");

var config = require("../config/default.json");

var Cart = require("../models/cart");

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
  var id, product, ggg, data, lists, color, size, distinct_size, detail_anh, tong, i, page_items, _i, cc, j, itemi;

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
          return regeneratorRuntime.awrap(productModel.detail_ggg());

        case 6:
          ggg = _context2.sent;
          data = ggg.filter(function (item) {
            return item.makm == id;
          }); //console.log("data:",data)

          _context2.next = 10;
          return regeneratorRuntime.awrap(productModel.detail(id));

        case 10:
          lists = _context2.sent;
          _context2.next = 13;
          return regeneratorRuntime.awrap(productModel.distinct_color(id));

        case 13:
          color = _context2.sent;
          _context2.next = 16;
          return regeneratorRuntime.awrap(productModel.detail_size(id));

        case 16:
          size = _context2.sent;
          _context2.next = 19;
          return regeneratorRuntime.awrap(productModel.distinct_size(id));

        case 19:
          distinct_size = _context2.sent;
          _context2.next = 22;
          return regeneratorRuntime.awrap(productModel.detail_anh(id));

        case 22:
          detail_anh = _context2.sent;
          tong = 0;

          for (i = 0; i < size.length; i++) {
            tong += size[i].soluong;
          }

          console.log("tong:", tong);
          page_items = [];

          for (_i = 0; _i < color.length; _i++) {
            if (color[_i].color_id >= 0) {
              cc = [];

              for (j = 0; j < size.length; j++) {
                if (color[_i].color_id == size[j].color_id) {
                  cc.push(size[j]);
                }
              }

              itemi = {
                code: color[_i],
                items: cc
              };
              console.log("itemi", itemi);
              page_items.push(itemi); // Thêm phần tử vào cuối mảng mới
            }
          } //console.log("page_items",page_items)


          res.render("vwproducts/detail", {
            //layout: false,
            detail_anh: detail_anh,
            sanpham: lists,
            giamgia: data,
            page_items: page_items,
            empty: lists.length === 0,
            sizes: distinct_size,
            tongkho: tong
          });

        case 29:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //Get san pham loai

router.get("/do-be-gai/:MaLoai", function _callee3(req, res) {
  var ten_loai, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, c, page, offset, list, total, nPages, page_items, i, item;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(productModel.tenloai(req.params.MaLoai));

        case 2:
          ten_loai = _context3.sent;
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context3.prev = 6;

          for (_iterator2 = res.locals.lcCategories[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            c = _step2.value;

            if (c.MaLoai === +req.params.MaLoai) {
              c.isActive = true;
            }
          } //phan trang


          _context3.next = 14;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](6);
          _didIteratorError2 = true;
          _iteratorError2 = _context3.t0;

        case 14:
          _context3.prev = 14;
          _context3.prev = 15;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 17:
          _context3.prev = 17;

          if (!_didIteratorError2) {
            _context3.next = 20;
            break;
          }

          throw _iteratorError2;

        case 20:
          return _context3.finish(17);

        case 21:
          return _context3.finish(14);

        case 22:
          page = +req.query.page || 1;
          if (page < 0) page = (_readOnlyError("page"), 1);
          offset = (page - 1) * config.pagination.limit;
          _context3.next = 27;
          return regeneratorRuntime.awrap(productModel.pageByCat(req.params.MaLoai, config.pagination.limit, offset));

        case 27:
          list = _context3.sent;
          _context3.next = 30;
          return regeneratorRuntime.awrap(productModel.countByLoai(req.params.MaLoai));

        case 30:
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
            maloai: ten_loai,
            prev_value: page - 1,
            next_value: page + 1
          });

        case 35:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[6, 10, 14, 22], [15,, 17, 21]]);
}); //do-be-gai

router.get("/do-be-gai", function _callee4(req, res) {
  var page, offset, list, total, count, i, nPages, page_items, _i2, item;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          //phan trang
          page = +req.query.page || 1;
          if (page < 0) page = (_readOnlyError("page"), 1);
          offset = (page - 1) * config.pagination.limit;
          _context4.next = 5;
          return regeneratorRuntime.awrap(productModel.pageByCat_gai(config.pagination.limit, offset));

        case 5:
          list = _context4.sent;
          _context4.next = 8;
          return regeneratorRuntime.awrap(productModel.countByLoai_gai());

        case 8:
          total = _context4.sent;
          count = 0;

          for (i = 0; i < total.length; i++) {
            count++;
          }

          nPages = Math.ceil(count / config.pagination.limit);
          page_items = [];

          for (_i2 = 1; _i2 <= nPages; _i2++) {
            item = {
              value: _i2,
              isActive: _i2 === page
            };
            page_items.push(item);
          }

          res.render("vwproducts/byCat", {
            sanpham: list,
            empty: list.length === 0,
            page_items: page_items,
            //maloai:"ten_loai",
            prev_value: page - 1,
            next_value: page + 1
          });

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //All get san pham loai do-be-gai

router.get("/category", function _callee5(req, res) {
  var madm, dm, page, offset, list, total, count, i, nPages, page_items, _i3, item;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          madm = req.query.category_id;
          _context5.next = 3;
          return regeneratorRuntime.awrap(productModel.all_dm());

        case 3:
          dm = _context5.sent;
          //phan trang
          page = +req.query.page || 1;
          if (page < 0) page = (_readOnlyError("page"), 1);
          offset = (page - 1) * config.pagination.limit;
          _context5.next = 9;
          return regeneratorRuntime.awrap(productModel.pageloai0(madm, config.pagination.limit, offset));

        case 9:
          list = _context5.sent;
          _context5.next = 12;
          return regeneratorRuntime.awrap(productModel.countByLoai0(madm));

        case 12:
          total = _context5.sent;
          count = 0;

          for (i = 0; i < total.length; i++) {
            count++;
          }

          nPages = Math.ceil(count / config.pagination.limit);
          page_items = [];

          for (_i3 = 1; _i3 <= nPages; _i3++) {
            item = {
              value: _i3,
              cate_id: madm,
              isActive: _i3 === page
            }; //console.log("text:",item)

            page_items.push(item);
          }

          if (madm == 1) {
            res.render("vwproducts/category1", {
              sanpham: list,
              empty: list.length === 0,
              page_items: page_items,
              prev_value: page - 1,
              next_value: page + 1
            });
          } else {
            res.render("vwproducts/category", {
              sanpham: list,
              empty: list.length === 0,
              page_items: page_items,
              prev_value: page - 1,
              next_value: page + 1
            });
          }

        case 19:
        case "end":
          return _context5.stop();
      }
    }
  });
}); //Get san pham loai

router.get("/do-be-trai/:MaLoai", function _callee6(req, res) {
  var ten_loai, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, c, page, offset, list, total, nPages, page_items, i, item;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(productModel.tenloai(req.params.MaLoai));

        case 2:
          ten_loai = _context6.sent;
          _iteratorNormalCompletion3 = true;
          _didIteratorError3 = false;
          _iteratorError3 = undefined;
          _context6.prev = 6;

          for (_iterator3 = res.locals.lcCategories1[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            c = _step3.value;

            if (c.MaLoai === +req.params.MaLoai) {
              c.isActive = true;
            }
          } //phan trang


          _context6.next = 14;
          break;

        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](6);
          _didIteratorError3 = true;
          _iteratorError3 = _context6.t0;

        case 14:
          _context6.prev = 14;
          _context6.prev = 15;

          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }

        case 17:
          _context6.prev = 17;

          if (!_didIteratorError3) {
            _context6.next = 20;
            break;
          }

          throw _iteratorError3;

        case 20:
          return _context6.finish(17);

        case 21:
          return _context6.finish(14);

        case 22:
          page = +req.query.page || 1;
          if (page < 0) page = (_readOnlyError("page"), 1);
          offset = (page - 1) * config.pagination.limit;
          _context6.next = 27;
          return regeneratorRuntime.awrap(productModel.pageByCat(req.params.MaLoai, config.pagination.limit, offset));

        case 27:
          list = _context6.sent;
          _context6.next = 30;
          return regeneratorRuntime.awrap(productModel.countByLoai(req.params.MaLoai));

        case 30:
          total = _context6.sent;
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
            maloai: ten_loai,
            prev_value: page - 1,
            next_value: page + 1
          });

        case 35:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[6, 10, 14, 22], [15,, 17, 21]]);
}); //Get tất cả bé trai

router.get("/do-be-trai", function _callee7(req, res) {
  var page, offset, list, total, count, i, nPages, page_items, _i4, item;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          //phan trang
          page = +req.query.page || 1;
          if (page < 0) page = (_readOnlyError("page"), 1);
          offset = (page - 1) * config.pagination.limit;
          _context7.next = 5;
          return regeneratorRuntime.awrap(productModel.pageByCat_trai(config.pagination.limit, offset));

        case 5:
          list = _context7.sent;
          _context7.next = 8;
          return regeneratorRuntime.awrap(productModel.countByLoai_trai());

        case 8:
          total = _context7.sent;
          count = 0;

          for (i = 0; i < total.length; i++) {
            count++;
          }

          nPages = Math.ceil(count / config.pagination.limit);
          page_items = [];

          for (_i4 = 1; _i4 <= nPages; _i4++) {
            item = {
              value: _i4,
              isActive: _i4 === page
            };
            page_items.push(item);
          }

          res.render("vwproducts/byCat", {
            sanpham: list,
            empty: list.length === 0,
            page_items: page_items,
            //maloai:"ten_loai",
            prev_value: page - 1,
            next_value: page + 1
          });

        case 15:
        case "end":
          return _context7.stop();
      }
    }
  });
}); //xuat san pham loai

router.get("/phu-kien/:MaLoai", function _callee8(req, res) {
  var _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, c, page, offset, list, total, nPages, page_items, i, item;

  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _iteratorNormalCompletion4 = true;
          _didIteratorError4 = false;
          _iteratorError4 = undefined;
          _context8.prev = 3;

          for (_iterator4 = res.locals.lcCategories2[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            c = _step4.value;

            if (c.MaLoai === +req.params.MaLoai) {
              c.isActive = true;
            }
          } //phan trang


          _context8.next = 11;
          break;

        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](3);
          _didIteratorError4 = true;
          _iteratorError4 = _context8.t0;

        case 11:
          _context8.prev = 11;
          _context8.prev = 12;

          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }

        case 14:
          _context8.prev = 14;

          if (!_didIteratorError4) {
            _context8.next = 17;
            break;
          }

          throw _iteratorError4;

        case 17:
          return _context8.finish(14);

        case 18:
          return _context8.finish(11);

        case 19:
          page = +req.query.page || 1;
          if (page < 0) page = (_readOnlyError("page"), 1);
          offset = (page - 1) * config.pagination.limit;
          _context8.next = 24;
          return regeneratorRuntime.awrap(productModel.pageByCat(req.params.MaLoai, config.pagination.limit, offset));

        case 24:
          list = _context8.sent;
          _context8.next = 27;
          return regeneratorRuntime.awrap(productModel.countByLoai(req.params.MaLoai));

        case 27:
          total = _context8.sent;
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
          return _context8.stop();
      }
    }
  }, null, null, [[3, 7, 11, 19], [12,, 14, 18]]);
});
module.exports = router;