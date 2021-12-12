"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var express = require("express");

var db = require("../utils/db");

var productModel = require("../models/product.model");

var config = require("../config/default.json");

var Cart = require("../models/cart");

var ModelOrder = require("../models/order.model");

var router = express.Router();
router.get("/", function _callee(req, res) {
  var page, offset, list, total, nPages, page_items, i, item;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          //phan trang
          page = +req.query.page || 1;
          if (page < 0) page = (_readOnlyError("page"), 1);
          offset = (page - 1) * config.pagination.limit;
          _context.next = 5;
          return regeneratorRuntime.awrap(productModel.newProduct(config.pagination.limit, offset));

        case 5:
          list = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(productModel.countByCat());

        case 8:
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

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
}); //tim kiem

router.get("/search", function _callee2(req, res) {
  var product, tenSP, data;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(productModel.all());

        case 2:
          product = _context2.sent;
          tenSP = req.query.TenSP;
          data = product.filter(function (item) {
            return item.TenSP.toLowerCase().indexOf(tenSP.toLowerCase()) !== -1;
          });
          res.render("vwproducts/list", {
            sanpham: data,
            empty: data.length === 0
          });
          console.log("aaaaaaaaaaaaaaaaaaaaaaaaa", data);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //shopping cart//

router.post("/cart/:id", function _callee3(req, res) {
  var productId, cl, si, rows, spct, product, cart;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          productId = req.params.id;
          cl = req.query.color;
          si = req.query.size;
          _context3.next = 5;
          return regeneratorRuntime.awrap(productModel.single_cart(productId, cl, si));

        case 5:
          rows = _context3.sent;
          spct = rows[0].sp_id;
          product = {
            masp: rows[0].MaSP,
            tensp: rows[0].TenSP,
            anh: rows[0].Anh,
            size: rows[0].size,
            color: rows[0].color,
            gia: rows[0].Gia,
            sp_id: rows[0].sp_id
          };
          console.log("new product: ", product);
          cart = new Cart(req.session.cart ? req.session.cart : {});
          cart.add(product, spct);
          req.session.cart = cart;
          console.log(req.session.cart);
          res.redirect("/shop_cart");

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.get("/shop_cart", function (req, res, next) {
  if (!req.session.cart) {
    return res.render("vwcart/shopcart", {
      products: null
    });
  }

  var cart = new Cart(req.session.cart);
  console.log("newcart", cart);
  res.render("vwcart/shopcart", {
    products: cart.getItems(),
    totalItems: cart.totalItems,
    toPri: cart.totalPrice
  });
  console.log("dddddddddddcartt", {
    products: cart.getItems(),
    totalItems: cart.totalItems,
    toPri: cart.totalPrice
  });
});
router.get("/remove/:id", function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.remove(productId);
  req.session.cart = cart;
  res.redirect("/shop_cart");
}); //checkout

router.get("/checkout", isLogIn, function (req, res, next) {
  if (!req.session.cart) {
    return res.redirect("/shop_cart");
  }

  var cart = new Cart(req.session.cart);
  console.log("checkout:", cart);
  var errMsg = req.flash("error")[0];
  res.render("vwcart/checkout", {
    products: cart.getItems(),
    //
    toPri: cart.totalPrice,
    //
    errMsg: errMsg,
    noError: !errMsg,
    layout: false //

  });
  console.log({
    products: cart.getItems(),
    toPri: cart.totalPrice
  }, "checkout2");
});
router.post("/checkout", function _callee4(req, res, next) {
  var cart, user, quan, tinh, entity, idhd, new_sp, arrlist, i, mahd, masp, tensp, gia, soluong, arr;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (req.session.cart) {
            _context4.next = 2;
            break;
          }

          return _context4.abrupt("return", res.redirect("/shop_cart"));

        case 2:
          cart = new Cart(req.session.cart);
          user = req.session.authUser;
          quan = req.body.quanhuyen;
          tinh = req.body.tinh; //user lưu maKH, ngayHD, tenNN, diachi, ngaynhan, soluong:cart.totalItems, tongtien:cart.totalPrice vào hoadon

          entity = {
            makh: user.MaKH,
            tennn: req.body.tennn,
            sdt: req.body.sdt,
            diachi: req.body.diachi + "," + quan + "," + tinh,
            soluong: cart.totalItems,
            tongtien: cart.totalPrice,
            ghichu: req.body.ghichu
          };
          _context4.next = 9;
          return regeneratorRuntime.awrap(ModelOrder.add_order(entity));

        case 9:
          _context4.next = 11;
          return regeneratorRuntime.awrap(ModelOrder.id_order());

        case 11:
          idhd = _context4.sent;
          new_sp = cart.getItems();
          arrlist = [];

          for (i = 0; i < new_sp.length; i++) {
            mahd = idhd;
            masp = new_sp[i].masp;
            tensp = new_sp[i].tensp;
            gia = new_sp[i].gia;
            soluong = new_sp[i].quantity;
            arr = [mahd, masp, tensp, gia, soluong];
            arrlist.push(arr);
          }

          _context4.next = 17;
          return regeneratorRuntime.awrap(db.insert_chitiethd(arrlist));

        case 17:
          console.log("arrlist:", arrlist);
          console.log("cart:", cart);
          /* if (err) {
            req.flash("error", err.message);
            return res.redirect("/checkout");
          }
          req.flash("Thành công", "Sản phẩm đã mua thành công!");*/

          req.session.cart = null;
          res.redirect("/");

        case 21:
        case "end":
          return _context4.stop();
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