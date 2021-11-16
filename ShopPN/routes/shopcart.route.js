const express = require("express");
const session = require("express-session");
const productModel = require("../models/product.model");
const db = require("../utils/db");
const tbl_products = "Sanpham";
const mysql = require('mysql');
const router = express.Router();


var cart_data, cart = {};

router.post('/shopcart', function (req, res) {
    cart = req.session.cart;
    if (!cart) {
        cart = req.session.cart = {}
    }

    var id = req.body.id;
    var count = parseInt(req.body.count, 10);

    cart[id] = (cart[id] || 0) + count;

    var ids = Object.keys(cart);

    if (ids.length > 0) {
        db.load(`select * from ${tbl_products} where masp IN (${ids})`, function (err, rows) {
            if (err) throw err;
            cart_data = rows;
            res.render('vwcart/shopcart', {
                title: 'Node Shopping', 
                data: data, 
                currency: 'Rs. ', 
                cart_data: rows, 
                cart: cart
            });
        });
    } else {
        res.render('vwcart/shopcart', {
            title: 'Node Shopping', 
            data: data, 
            currency: 'Rs. ', 
            cart_data: cart_data
        });
    }
});

router.get('/shopcart', function (req, res) {
    res.render('vwcart/shopcart', {
        title: 'Node Shopping', 
        data: data, 
        currency: 'Rs. ', 
        cart_data: cart_data, 
        cart: cart
    });
});


module.exports = router;