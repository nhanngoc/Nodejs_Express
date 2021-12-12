const express = require("express");
const db = require("../utils/db");
const productModel = require("../models/product.model");
const config = require("../config/default.json");
const Cart = require("../models/cart");
const ModelOrder = require("../models/order.model");

const router = express.Router();

router.get("/", async function (req, res) {
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
    sanpham: list,
    empty: list.length === 0,
    page_items,
    prev_value: page - 1,
    next_value: page + 1,
  });
});
//tim kiem
router.get("/search", async function (req, res) {
  const product = await productModel.all();
  const tenSP = req.query.TenSP;
  const data = product.filter(function (item) {
    return item.TenSP.toLowerCase().indexOf(tenSP.toLowerCase()) !== -1;
  });
  res.render("vwproducts/list", {
    sanpham: data,
    empty: data.length === 0,
  });
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaa", data);
});

//shopping cart//
router.post("/cart/:id", async function (req, res) {
  const productId = req.params.id;
  const cl = req.query.color;
  const si = req.query.size;
  const rows = await productModel.single_cart(productId, cl, si);
  const spct = rows[0].sp_id;
  const product = {
    masp: rows[0].MaSP,
    tensp: rows[0].TenSP,
    anh: rows[0].Anh,
    size: rows[0].size,
    color: rows[0].color,
    gia: rows[0].Gia,
    sp_id: rows[0].sp_id,
  };
  console.log("new product: ", product);
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.add(product, spct);
  req.session.cart = cart;
  console.log(req.session.cart);

  res.redirect("/shop_cart");
});
router.get("/shop_cart", function (req, res, next) {
  if (!req.session.cart) {
    return res.render("vwcart/shopcart", { products: null });
  }
  let cart = new Cart(req.session.cart);
  console.log("newcart", cart);
  res.render("vwcart/shopcart", {
    products: cart.getItems(),
    totalItems: cart.totalItems,
    toPri: cart.totalPrice,
  });
  console.log("dddddddddddcartt", {
    products: cart.getItems(),
    totalItems: cart.totalItems,
    toPri: cart.totalPrice,
  });
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
  isLogIn, function (req, res, next) {
    if (!req.session.cart) {
      return res.redirect("/shop_cart");
    }
    const cart = new Cart(req.session.cart);
    console.log("checkout:", cart);
    const errMsg = req.flash("error")[0];

    res.render("vwcart/checkout", {
      products: cart.getItems(), //
      toPri: cart.totalPrice, //
      errMsg: errMsg,
      noError: !errMsg,
      layout: false, //
    });
    console.log(
      { products: cart.getItems(), toPri: cart.totalPrice },
      "checkout2"
    );
  }
);
router.post("/checkout", async function (req, res, next) {
  if (!req.session.cart) {
    return res.redirect("/shop_cart");
  }
  const cart = new Cart(req.session.cart);
  const user = req.session.authUser;
  const quan = req.body.quanhuyen;
  const tinh = req.body.tinh;
  //user lưu maKH, ngayHD, tenNN, diachi, ngaynhan, soluong:cart.totalItems, tongtien:cart.totalPrice vào hoadon
  const entity = {
    makh: user.MaKH,
    tennn: req.body.tennn,
    sdt: req.body.sdt,
    diachi: req.body.diachi+","+quan+","+tinh,
    soluong: cart.totalItems,
    tongtien: cart.totalPrice,
    ghichu: req.body.ghichu,
  };
  await ModelOrder.add_order(entity);
  //cart lưu mahd, MaSP:cart.getItems.item.masp, TenSP:cart.getItems. gia:cart.getItems.gia soluong:cart.getItems.quantity vào chitiethd
  const idhd = await ModelOrder.id_order();
  const new_sp = cart.getItems();
  let arrlist = [];
  for (let i = 0; i < new_sp.length; i++) {
    const mahd = idhd;
    const masp = new_sp[i].masp;
    const tensp = new_sp[i].tensp;
    const gia = new_sp[i].gia;
    const soluong = new_sp[i].quantity;
    let arr = [mahd, masp, tensp, gia, soluong];
    arrlist.push(arr);
  }
  await db.insert_chitiethd(arrlist);
  console.log("arrlist:", arrlist);
  console.log("cart:", cart);
  /* if (err) {
    req.flash("error", err.message);
    return res.redirect("/checkout");
  }
  req.flash("Thành công", "Sản phẩm đã mua thành công!");*/
  req.session.cart = null;
  res.redirect("/");
});

module.exports = router;

function isLogIn(req, res, next) {
  if (req.session.isAuthenticated) {
    return next();
  }
  req.session.retUrl = req.url;
  res.redirect("/account/login");
}
