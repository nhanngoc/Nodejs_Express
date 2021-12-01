"use strict";

var express = require('express');

var router = express.Router();

var csrf = require('csurf');

var passport = require('passport');

var Order = require('../models/order.model');

var Cart = require('../models/cart');

var csrfProtection = csrf();
router.use(csrfProtection);
router.get('/profile', isLoggedIn, function (req, res, next) {
  Order.all({
    user: req.user
  }, function (err, orders) {
    if (err) {
      return res.write('Error!');
    }

    var cart;
    orders.forEach(function (order) {
      cart = new Cart(order.cart);
      order.items = cart.getItems();
    });
    res.render('user/profile', {
      orders: orders
    });
  });
});
router.get('/logout', isLoggedIn, function (req, res, next) {
  req.logout();
  res.redirect('/');
});
router.use('/', notLoggedIn, function (req, res, next) {
  next();
});
router.get('/signup', csrfProtection, function (req, res, next) {
  var token = req.csrfToken(); //cookie('XSRF-TOKEN', token);

  res.render('user/signup', {
    csrfToken: token
  });
});
router.post('/signup', passport.authenticate('local.signup', {
  failureRedirect: '/user/signup',
  failureFlash: true
}), function (req, res, next) {
  if (req.session.oldUrl) {
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect('/user/profile');
  }
});
router.get('/signin', csrfProtection, function (req, res, next) {
  var token = req.csrfToken(); //cookie('XSRF-TOKEN', token);

  res.render('user/signin', {
    csrfToken: token
  });
});
router.post('/signin', passport.authenticate('local.signin', {
  failureRedirect: '/user/signin',
  failureFlash: true
}), function (req, res, next) {
  if (req.session.oldUrl) {
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect('/user/profile');
  }
});
module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}