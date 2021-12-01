"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var express = require("express");

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
          /* 
          const list = await productModel.allByCat(req.params.maLoai);
          //hien thi san pham
          res.render("vwproducts/byCat", {
            sanpham: list,
            empty: list.length === 0,
          }); */
          // const list = await productModel.allByCat(req.params.catId);
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
            sanphammmm: list,
            empty: list.length === 0,
            page_items: page_items,
            prev_value: page - 1,
            next_value: page + 1
          }); //console.log('sannnnnnnnn',{sp: list})

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
}); //tim kiem

router.get("/search", function _callee2(req, res) {
  var product, TenSP, data;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(productModel.all());

        case 2:
          product = _context2.sent;
          TenSP = req.query.TenSP;
          data = product.filter(function (item) {
            return item.TenSP.toLowerCase().indexOf(TenSP.toLowerCase()) !== -1;
          });
          res.render("home", {
            sanphammmm: data,
            empty: data.length === 0
          });

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //shopping cart// id của sanphamct sp_id

/* router.get("/cart/:id", async function (req, res) {
  const productId = req.params.id;
  const rows = await productModel.single_cart(productId);
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  console.log("ddddddddddd1");
  cart.add(rows[0], productId);
  req.session.cart = cart;
  console.log(req.session.cart);
  res.redirect("/");
}); */
//shopping cart// id của sanphamct sp_id

router.get("/cart/:id", function _callee3(req, res) {
  var productId, rows, cart;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          productId = req.params.id;
          console.log("ddddddddddd1", productId);
          _context3.next = 4;
          return regeneratorRuntime.awrap(productModel.single_cart(productId));

        case 4:
          rows = _context3.sent;
          cart = new Cart(req.session.cart ? req.session.cart : {});
          console.log("ddddddddddd1", rows);
          cart.add(rows[0], productId);
          req.session.cart = cart;
          console.log(req.session.cart);
          res.redirect("/shop_cart");

        case 11:
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
  console.log(cart, "dddddddddddcartt");
  res.render("vwcart/shopcart", {
    products: cart.getItems(),
    toPri: cart.totalPrice
  });
  console.log({
    products: cart.getItems(),
    toPri: cart.totalPrice
  }, "dddddddddddcartt");
});
router.get("/remove/:id", function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.remove(productId);
  req.session.cart = cart;
  res.redirect("/shop_cart");
}); //checkout

router.get("/checkout",
/* isLogIn, */
function (req, res, next) {
  if (!req.session.cart) {
    return res.redirect("/shop_cart");
  }

  var cart = new Cart(req.session.cart);
  var errMsg = req.flash("error")[0];
  res.render("vwcart/checkout", {
    total: cart.totalPrice,
    errMsg: errMsg,
    noError: !errMsg,
    layout: false
  });
});
router.post("/checkout",
/* isLogIn, */
function (req, res, next) {
  if (!req.session.cart) {
    return res.redirect("/shop_cart");
  }

  var cart = new Cart(req.session.cart);

  var stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: "usd",
    source: "tok_mastercard",
    // obtained with Stripe.js
    description: "Test Charge"
  }, function (err, charge) {
    if (err) {
      req.flash("error", err.message);
      return res.redirect("/checkout");
    }

    var order = {
      user: req.session.authUser,
      cart: cart,
      address: req.body.address,
      name: req.body.name,
      paymentId: charge.id
    };
    ModelOrder.add_order(order, function (err, result) {
      if (err) {
        req.flash("error", err.message);
        return res.redirect("/checkout");
      }

      req.flash("Thành công", "Sản phẩm đã mua thành công!");
      req.session.cart = null;
      res.redirect("/");
    });
  });
});
/* router.get("/", async function (req, res) {
  for (const c of res.locals.lcCategories) {
    if (c.MaLoai === +req.params.MaLoai) {
      c.isActive = true;
    }
  }
  // const list = await productModel.allByCat(req.params.catId);
  //phan trang
  const page = +req.query.page || 1;
  if (page < 0) page = 1;
  const offset = (page - 1) * config.pagination.limit;
  const list = await productModel.pageByHome(
    req.params.MaLoai,
    config.pagination.limit,
    offset
  );
  const total = await productModel.countByCat();
  const nPages = Math.ceil(total / config.pagination.limit);
  const page_items = [];
  for (let i = 1; i <= nPages; i++) {
    const item = {
      value: i,
      isActive: i === page,
    };
    page_items.push(item);
  }
  res.render("home", {
    sanpham: list,
    empty: list.length === 0,
    page_items,
    prev_value: page - 1,
    next_value: page + 1,
  });
}); */

module.exports = router;

function isLogIn(req, res, next) {
  if (req.session.isAuthenticated) {
    return next();
  }

  req.session.retUrl = req.url;
  res.redirect("/account/login");
}