"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var express = require("express");

var db = require("../utils/db");

var productModel = require("../models/product.model");

var config = require("../config/default.json");

var Cart = require("../models/cart");

var ModelOrder = require("../models/order.model");

var router = express.Router(); //get home

router.get("/", function _callee(req, res) {
  var list, giamgia, gg, i, item;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(productModel.newProduct());

        case 2:
          list = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(productModel.giam_gia());

        case 5:
          giamgia = _context.sent;
          gg = [];

          for (i = 0; i < giamgia.length; i++) {
            item = {
              MaSP: giamgia[i].makm,
              TenSP: giamgia[i].TenSP,
              Anh: giamgia[i].Anh,
              Gia: giamgia[i].Gia,
              //giá củ 185 b
              giakm: giamgia[i].giakm,
              //giá mới 99 a
              phantram: ((giamgia[i].giakm - giamgia[i].Gia) / giamgia[i].Gia * 100).toPrecision(2)
            }; //console.log("GiamGia", item);

            gg.push(item);
          } //console.log("gg", gg);


          res.render("home", {
            sanpham: list,
            giamgia: gg,
            empty: list.length === 0,
            empty_gg: gg.length === 0
          });

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}); //get home_page

router.get("/page", function _callee2(req, res) {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, c, page, offset, list, total, count, i, nPages, page_items, _i, item;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
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
          return regeneratorRuntime.awrap(productModel.allProduct(config.pagination.limit, offset));

        case 24:
          list = _context2.sent;
          _context2.next = 27;
          return regeneratorRuntime.awrap(productModel.countByCat());

        case 27:
          total = _context2.sent;
          count = 0;

          for (i = 0; i < total.length; i++) {
            count++;
          }

          nPages = Math.ceil(count / config.pagination.limit);
          page_items = [];

          for (_i = 1; _i <= nPages; _i++) {
            item = {
              value: _i,
              isActive: _i === page
            };
            page_items.push(item);
          }

          res.render("home_page", {
            sanpham: list,
            empty: list.length === 0,
            page_items: page_items,
            prev_value: page - 1,
            next_value: page + 1
          });

        case 34:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 7, 11, 19], [12,, 14, 18]]);
}); //search

router.get("/search", function _callee3(req, res) {
  var product, name_search, data;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(productModel.seach_products());

        case 2:
          product = _context3.sent;
          name_search = req.query.name_search;
          data = product.filter(function (item) {
            return item.TenSP.toLowerCase().indexOf(name_search.toLowerCase()) !== -1 || item.Gia === parseInt(name_search) || item.chatlieu.toLowerCase().indexOf(name_search.toLowerCase()) !== -1;
          });
          res.render("vwproducts/seach", {
            sanpham: data,
            empty: data.length === 0
          }); //console.log("aaaaaaaaaaaaaaaaaaaaaaaaa", data);

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //huong dan

router.get("/huongdan", function (req, res) {
  res.render("log");
}); //post session cart//

router.post("/cart/:id", function _callee4(req, res) {
  var productId, cl, si, sl, gg, rows, spct, z, i, _product, _cart, product, cart;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          productId = req.params.id;
          cl = req.query.color;
          si = req.query.size;
          sl = req.query.quantity;
          _context4.next = 6;
          return regeneratorRuntime.awrap(productModel.all_giamgia());

        case 6:
          gg = _context4.sent;
          _context4.next = 9;
          return regeneratorRuntime.awrap(productModel.single_cart(productId, cl, si));

        case 9:
          rows = _context4.sent;
          spct = rows[0].sp_id;
          z = Number("".concat(sl));

          for (i = 0; i < gg.length; i++) {
            if (productId == gg[i].makm) {
              _product = {
                masp: rows[0].MaSP,
                tensp: rows[0].TenSP,
                anh: rows[0].Anh,
                size: rows[0].size,
                color: rows[0].color,
                gia: gg[i].giakm,
                //
                sp_id: rows[0].sp_id,
                soluong: rows[0].soluong,
                quantitys: z
              };
              _cart = new Cart(req.session.cart ? req.session.cart : {});

              _cart.add(_product, spct);

              req.session.cart = _cart; //res.redirect(`products/detail/${productId}`);

              res.redirect("/shop_cart");
            }
          }

          product = {
            masp: rows[0].MaSP,
            tensp: rows[0].TenSP,
            anh: rows[0].Anh,
            size: rows[0].size,
            color: rows[0].color,
            gia: rows[0].Gia,
            //
            sp_id: rows[0].sp_id,
            soluong: rows[0].soluong,
            quantitys: z
          };
          cart = new Cart(req.session.cart ? req.session.cart : {});
          cart.add(product, spct);
          req.session.cart = cart; //res.redirect(`products/detail/${productId}`);

          res.redirect("/shop_cart");

        case 18:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //get cart

router.get("/shop_cart", function (req, res, next) {
  if (!req.session.cart) {
    return res.render("vwcart/shopcart", {
      products: null
    });
  }

  var cart = new Cart(req.session.cart);
  var totalPrice = 0;
  var totalItems = 0;
  var new_sp = cart.getItems();

  for (var i = 0; i < new_sp.length; i++) {
    totalPrice += new_sp[i].gia;
    totalItems += new_sp[i].quantity;
  }

  res.render("vwcart/shopcart", {
    products: cart.getItems(),
    //totalItems: cart.totalItems,
    //toPri: cart.totalPrice,
    totalItems: totalItems,
    toPri: totalPrice
  });
}); //delete cart

router.get("/remove/:id", function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.remove(productId);
  req.session.cart = cart;
  res.redirect("/shop_cart");
}); //update cart

router.post("/update/:id", function (req, res) {
  var spct = req.params.id;
  var sl = req.body.quantity;
  var z = Number("".concat(sl));
  var carts = new Cart(req.session.cart);
  var new_sp = carts.getItems();
  var product = {
    masp: new_sp[0].item.masp,
    tensp: new_sp[0].item.tensp,
    anh: new_sp[0].item.anh,
    size: new_sp[0].item.size,
    color: new_sp[0].item.color,
    gia: new_sp[0].item.gia,
    sp_id: new_sp[0].item.sp_id,
    quantitys: z
  };
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.update(product, spct);
  req.session.cart = cart;
  res.redirect("/shop_cart");
}); //checkout

router.get("/checkout", isLogIn, function (req, res, next) {
  if (!req.session.cart) {
    return res.redirect("/shop_cart");
  }

  user = req.session.authUser; //goi tới user đã đăng nhập

  var cart = new Cart(req.session.cart);
  var totalPrice = 0;
  var new_sp = cart.getItems();

  for (var i = 0; i < new_sp.length; i++) {
    totalPrice += new_sp[i].gia;
  }

  console.log("checkout:", cart);
  var errMsg = req.flash("error")[0];
  res.render("vwcart/checkout", {
    products: cart.getItems(),
    //
    user: user,
    toPri: totalPrice,
    //
    errMsg: errMsg,
    noError: !errMsg,
    layout: false //

  });
}); //checkout

router.post("/checkout", function _callee5(req, res, next) {
  var cart, totalPrice, new_sp, i, user, diachi, phuong, quan, tinh, today, date, entity, idhd, arrlist, _i2, mahd, masp, tensp, dongia, gia, quantity, ma_id, arr, spct, _i3, j, _entity;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          if (req.session.cart) {
            _context5.next = 2;
            break;
          }

          return _context5.abrupt("return", res.redirect("/shop_cart"));

        case 2:
          cart = new Cart(req.session.cart);
          totalPrice = 0;
          new_sp = cart.getItems();

          for (i = 0; i < new_sp.length; i++) {
            totalPrice += new_sp[i].gia;
          }

          user = req.session.authUser;
          diachi = req.body.diachi;
          phuong = req.body.phuong_xa;
          quan = req.body.quan_huyen;
          tinh = req.body.tinh;
          today = new Date();
          date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear(); //user lưu maKH, ngayHD, tenNN, diachi, ngaynhan, soluong:cart.totalItems, tongtien:cart.totalPrice vào hoadon

          entity = {
            ngayhd: date,
            makh: user.MaKH,
            tennn: req.body.tennn,
            sdt: req.body.sdt,
            diachi: diachi + ", " + phuong + ", " + quan + ", " + tinh,
            soluong: cart.totalItems,
            tongtien: totalPrice,
            ghichu: req.body.ghichu,
            trangthai: "Chờ xác nhận"
          };
          _context5.next = 16;
          return regeneratorRuntime.awrap(ModelOrder.add_order(entity));

        case 16:
          _context5.next = 18;
          return regeneratorRuntime.awrap(ModelOrder.id_order());

        case 18:
          idhd = _context5.sent;
          arrlist = [];

          for (_i2 = 0; _i2 < new_sp.length; _i2++) {
            mahd = idhd;
            masp = new_sp[_i2].masp;
            tensp = new_sp[_i2].tensp;
            dongia = new_sp[_i2].dongia;
            gia = new_sp[_i2].gia;
            quantity = new_sp[_i2].quantity;
            ma_id = new_sp[_i2].sp_id;
            arr = [mahd, masp, tensp, dongia, quantity, gia, ma_id];
            arrlist.push(arr);
          }

          _context5.next = 23;
          return regeneratorRuntime.awrap(db.insert_chitiethd(arrlist));

        case 23:
          _context5.next = 25;
          return regeneratorRuntime.awrap(ModelOrder.all_spct());

        case 25:
          spct = _context5.sent;
          _i3 = 0;

        case 27:
          if (!(_i3 < new_sp.length)) {
            _context5.next = 40;
            break;
          }

          j = 0;

        case 29:
          if (!(j < spct.length)) {
            _context5.next = 37;
            break;
          }

          if (!(new_sp[_i3].sp_id == spct[j].sp_id)) {
            _context5.next = 34;
            break;
          }

          _entity = {
            sp_id: new_sp[_i3].sp_id,
            soluong: spct[j].soluong - new_sp[_i3].quantity
          };
          _context5.next = 34;
          return regeneratorRuntime.awrap(ModelOrder.update_spct(_entity));

        case 34:
          j++;
          _context5.next = 29;
          break;

        case 37:
          _i3++;
          _context5.next = 27;
          break;

        case 40:
          //console.log("new_sp:",new_sp)
          req.session.cart = null;
          res.redirect("/checkout/success");

        case 42:
        case "end":
          return _context5.stop();
      }
    }
  });
});
router.get("/checkout/success", function _callee6(req, res, next) {
  var order;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(ModelOrder.all_order());

        case 2:
          order = _context6.sent;
          res.render("vwcart/success", {
            order: order
          });

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
});
module.exports = router;

function isLogIn(req, res, next) {
  if (req.session.isAuthenticated) {
    return next();
  }

  req.session.retUrl = req.url;
  res.redirect("/account/login");
}