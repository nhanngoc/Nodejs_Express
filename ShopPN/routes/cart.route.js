const express = require("express");
const Model = require("../models/product.model");
const Cart = require("../models/cart");
const router = express.Router();

router.get("/gh/:id", async function (req, res) {
  let productId = req.params.id;
  let cart = new Cart(req.session.cart ? req.session.cart : {});
  await Model.single_cart(productId, function (err, product) {
    if (err) {
      return res.redirect("/");
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect("/");
  });
});
