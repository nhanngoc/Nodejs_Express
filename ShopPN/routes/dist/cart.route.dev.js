"use strict";

var express = require("express");

var Model = require("../models/product.model");

var Cart = require("../models/cart");

var router = express.Router();
router.get("/gh/:id", function _callee(req, res) {
  var productId, cart;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          productId = req.params.id;
          cart = new Cart(req.session.cart ? req.session.cart : {});
          _context.next = 4;
          return regeneratorRuntime.awrap(Model.single_cart(productId, function (err, product) {
            if (err) {
              return res.redirect("/");
            }

            cart.add(product, product.id);
            req.session.cart = cart;
            console.log(req.session.cart);
            res.redirect("/");
          }));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});