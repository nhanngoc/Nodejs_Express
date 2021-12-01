const express = require("express");
const productModel = require("../models/product.model");
const config = require("../config/default.json");
const Cart = require("../models/cart");
const ModelOrder = require("../models/order.model");

const router = express.Router();

router.get("/", async function (req, res) {
  /* 
  const list = await productModel.allByCat(req.params.maLoai);
  //hien thi san pham
  res.render("vwproducts/byCat", {
    sanpham: list,
    empty: list.length === 0,
  }); */
  // const list = await productModel.allByCat(req.params.catId);

  //phan trang
  const page = +req.query.page || 1;
  if (page < 0) page = 1;
  const offset = (page - 1) * config.pagination.limit;
  const list = await productModel.newProduct(config.pagination.limit, offset);
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
    sanphammmm: list,
    empty: list.length === 0,
    page_items,
    prev_value: page - 1,
    next_value: page + 1,
  });
  //console.log('sannnnnnnnn',{sp: list})
});
//tim kiem
router.get("/search", async function (req, res) {
  const product = await productModel.all();
  const TenSP = req.query.TenSP;
  const data = product.filter(function (item) {
    return item.TenSP.toLowerCase().indexOf(TenSP.toLowerCase()) !== -1;
  });
  res.render("home", {
    sanphammmm: data,
    empty: data.length === 0,
  });
});
//shopping cart// id của sanphamct sp_id
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
router.get("/cart/:id", async function (req, res) {
  const productId = req.params.id;
  console.log("ddddddddddd1", productId);
  const rows = await productModel.single_cart(productId);
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  console.log("ddddddddddd1", rows);
  cart.add(rows[0], productId);
  req.session.cart = cart;
  console.log(req.session.cart);

  res.redirect("/shop_cart");
});


router.get("/shop_cart", function (req, res, next) {
  if (!req.session.cart) {
    return res.render("vwcart/shopcart", { products: null });
  }
  let cart = new Cart(req.session.cart);
  console.log(cart, "dddddddddddcartt");
  res.render("vwcart/shopcart", {
    products: cart.getItems(),
    toPri: cart.totalPrice,
  });
  console.log(
    { products: cart.getItems(), toPri: cart.totalPrice },
    "dddddddddddcartt"
  );
});

router.get("/remove/:id", function (req, res, next) {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.remove(productId);
  req.session.cart = cart;
  res.redirect("/shop_cart");
});
//checkout
router.get(
  "/checkout",
  /* isLogIn, */ function (req, res, next) {
    if (!req.session.cart) {
      return res.redirect("/shop_cart");
    }
    const cart = new Cart(req.session.cart);
    const errMsg = req.flash("error")[0];
    res.render("vwcart/checkout", {
      total: cart.totalPrice,
      errMsg: errMsg,
      noError: !errMsg,
      layout: false,
    });
  }
);
router.post(
  "/checkout",
  /* isLogIn, */ function (req, res, next) {
    if (!req.session.cart) {
      return res.redirect("/shop_cart");
    }
    const cart = new Cart(req.session.cart);

    const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

    stripe.charges.create(
      {
        amount: cart.totalPrice * 100,
        currency: "usd",
        source: "tok_mastercard", // obtained with Stripe.js
        description: "Test Charge",
      },
      function (err, charge) {
        if (err) {
          req.flash("error", err.message);
          return res.redirect("/checkout");
        }
        const order = {
          user: req.session.authUser,
          cart: cart,
          address: req.body.address,
          name: req.body.name,
          paymentId: charge.id,
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
      }
    );
  }
);

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
