const express = require("express");
const db = require("../utils/db");
const productModel = require("../models/product.model");
const config = require("../config/default.json");
const Cart = require("../models/cart");
const ModelOrder = require("../models/order.model");

const router = express.Router();
//get home
router.get("/", async function (req, res) {
  const list = await productModel.newProduct();
  const giamgia = await productModel.giam_gia();
  const gg = [];
  for (let i = 0; i < giamgia.length; i++) {
    const item = {
      MaSP: giamgia[i].makm,
      TenSP: giamgia[i].TenSP,
      Anh: giamgia[i].Anh,
      Gia: giamgia[i].Gia, //giá củ 185 b
      giakm: giamgia[i].giakm, //giá mới 99 a
      phantram: (
        ((giamgia[i].giakm - giamgia[i].Gia) / giamgia[i].Gia) *
        100
      ).toPrecision(2),
    };
    //console.log("GiamGia", item);
    gg.push(item);
  }
  //console.log("gg", gg);
  res.render("home", {
    sanpham: list,
    giamgia: gg,
    empty: list.length === 0,
    empty_gg: gg.length === 0,
  });
});
//get home_page
router.get("/page", async function (req, res) {
  for (const c of res.locals.lcCategories) {
    if (c.MaLoai === +req.params.MaLoai) {
      c.isActive = true;
    }
  }
  //phan trang
  const page = +req.query.page || 1;
  if (page < 0) page = 1;
  const offset = (page - 1) * config.pagination.limit;
  const list = await productModel.allProduct(config.pagination.limit, offset);
  const total = await productModel.countByCat();
  var count = 0;
  for(var i = 0; i < total.length; i++){
      count ++;
  }
  const nPages = Math.ceil(count / config.pagination.limit);
  const page_items = [];
  for (let i = 1; i <= nPages; i++) {
    const item = {
      value: i,
      isActive: i === page,
    };
    page_items.push(item);
  }
  res.render("home_page", {
    sanpham: list,
    empty: list.length === 0,
    page_items,
    prev_value: page - 1,
    next_value: page + 1,
  });
});
//search
router.get("/search", async function (req, res) {
  const product = await productModel.seach_products();
  const name_search = req.query.name_search;
  const data = product.filter(function (item) {
    return (
      item.TenSP.toLowerCase().indexOf(name_search.toLowerCase()) !== -1 ||
      item.Gia === parseInt(name_search)||
      item.chatlieu.toLowerCase().indexOf(name_search.toLowerCase()) !== -1 
    );
  });
  res.render("vwproducts/seach", {
    sanpham: data,
    empty: data.length === 0,
  });
  //console.log("aaaaaaaaaaaaaaaaaaaaaaaaa", data);
});

//huong dan
router.get("/huongdan", function (req, res) {
  res.render("log");
});
//post session cart//
router.post("/cart/:id", async function (req, res) {
  const productId = req.params.id;
  const cl = req.query.color;
  const si = req.query.size;
  const sl = req.query.quantity;
  const gg = await productModel.all_giamgia();
  const rows = await productModel.single_cart(productId, cl, si);
  const spct = rows[0].sp_id;
  const z = Number(`${sl}`);
  for (let i = 0; i < gg.length; i++) {
    if (productId == gg[i].makm) {
      const product = {
        masp: rows[0].MaSP,
        tensp: rows[0].TenSP,
        anh: rows[0].Anh,
        size: rows[0].size,
        color: rows[0].color,
        gia: gg[i].giakm, //
        sp_id: rows[0].sp_id,
        soluong: rows[0].soluong,
        quantitys: z,
      };
      const cart = new Cart(req.session.cart ? req.session.cart : {});
      cart.add(product, spct);
      req.session.cart = cart;
      //res.redirect(`products/detail/${productId}`);
      res.redirect("/shop_cart");
    }
  }
  const product = {
    masp: rows[0].MaSP,
    tensp: rows[0].TenSP,
    anh: rows[0].Anh,
    size: rows[0].size,
    color: rows[0].color,
    gia: rows[0].Gia, //
    sp_id: rows[0].sp_id,
    soluong: rows[0].soluong,
    quantitys: z,
  };
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.add(product, spct);
  req.session.cart = cart;
  //res.redirect(`products/detail/${productId}`);
  res.redirect("/shop_cart");
});
//get cart
router.get("/shop_cart", function (req, res, next) {
  if (!req.session.cart) {
    return res.render("vwcart/shopcart", { products: null });
  }
  let cart = new Cart(req.session.cart);
  var totalPrice = 0;
  var totalItems = 0;
  const new_sp = cart.getItems();
  for (let i = 0; i < new_sp.length; i++) {
    totalPrice += new_sp[i].gia;
    totalItems += new_sp[i].quantity;
  }
  res.render("vwcart/shopcart", {
    products: cart.getItems(),
    //totalItems: cart.totalItems,
    //toPri: cart.totalPrice,
    totalItems: totalItems,
    toPri: totalPrice,
  });
});
//delete cart
router.get("/remove/:id", function (req, res, next) {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.remove(productId);
  req.session.cart = cart;
  res.redirect("/shop_cart");
});
//update cart
router.post("/update/:id", function (req, res) {
  const spct = req.params.id;
  const sl = req.body.quantity;
  const z = Number(`${sl}`);
  const carts = new Cart(req.session.cart);
  const new_sp = carts.getItems();
  const product = {
    masp: new_sp[0].item.masp,
    tensp: new_sp[0].item.tensp,
    anh: new_sp[0].item.anh,
    size: new_sp[0].item.size,
    color: new_sp[0].item.color,
    gia: new_sp[0].item.gia,
    sp_id: new_sp[0].item.sp_id,
    quantitys: z,
  };
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.update(product, spct);
  req.session.cart = cart;
  res.redirect("/shop_cart");
});
//checkout
router.get("/checkout", isLogIn, function (req, res, next) {
  if (!req.session.cart) {
    return res.redirect("/shop_cart");
  }
  user=req.session.authUser;//goi tới user đã đăng nhập
  const cart = new Cart(req.session.cart);
  var totalPrice = 0;
  const new_sp = cart.getItems();
  for (let i = 0; i < new_sp.length; i++) {
    totalPrice += new_sp[i].gia;
  }
  console.log("checkout:", cart);
  const errMsg = req.flash("error")[0];
  res.render("vwcart/checkout", {
    products: cart.getItems(), //
    user: user,
    toPri: totalPrice, //
    errMsg: errMsg,
    noError: !errMsg,
    layout: false, //
  });
});

//checkout
router.post("/checkout", async function (req, res, next) {
  if (!req.session.cart) {
    return res.redirect("/shop_cart");
  }
  const cart = new Cart(req.session.cart);
  var totalPrice = 0;
  const new_sp = cart.getItems();
  for (let i = 0; i < new_sp.length; i++) {
    totalPrice += new_sp[i].gia;
  }
  const user = req.session.authUser;
  const diachi = req.body.diachi;
  const phuong = req.body.phuong_xa;
  const quan = req.body.quan_huyen;
  const tinh = req.body.tinh;
  var today = new Date();
  var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
  //user lưu maKH, ngayHD, tenNN, diachi, ngaynhan, soluong:cart.totalItems, tongtien:cart.totalPrice vào hoadon
  const entity = {
    ngayhd: date,
    makh: user.MaKH,
    tennn: req.body.tennn,
    sdt: req.body.sdt,
    diachi: diachi + ", " + phuong + ", " + quan + ", " + tinh,
    soluong: cart.totalItems,
    tongtien: totalPrice,
    ghichu: req.body.ghichu,
    trangthai: "Chờ xác nhận",
  };
  await ModelOrder.add_order(entity);
  //cart lưu mahd, MaSP:cart.getItems.item.masp, TenSP:cart.getItems. gia:cart.getItems.gia soluong:cart.getItems.quantity vào chitiethd
  const idhd = await ModelOrder.id_order();
  let arrlist = [];
  for (let i = 0; i < new_sp.length; i++) {
    const mahd = idhd;
    const masp = new_sp[i].masp;
    const tensp = new_sp[i].tensp;
    const dongia = new_sp[i].dongia;
    const gia = new_sp[i].gia;
    const quantity = new_sp[i].quantity;
    const ma_id = new_sp[i].sp_id;
    let arr = [mahd, masp, tensp, dongia, quantity, gia, ma_id];
    arrlist.push(arr);
  }
  await db.insert_chitiethd(arrlist);
  //console.log("arrlist:", arrlist);
  //console.log("cart:", cart);
  //lay sp_id
  const spct = await ModelOrder.all_spct();
  for(let i = 0; i < new_sp.length; i++){
    for(let j = 0; j < spct.length; j++){
      if(new_sp[i].sp_id == spct[j].sp_id){
        const entity ={
          sp_id: new_sp[i].sp_id,
          soluong: spct[j].soluong - new_sp[i].quantity,
        }
        await ModelOrder.update_spct(entity);
      }
    }
  }
  //console.log("new_sp:",new_sp)
  req.session.cart = null;
  res.redirect("/checkout/success");
});
router.get("/checkout/success", async function (req, res, next) {
  const order= await ModelOrder.all_order();
  res.render("vwcart/success",
  {
    order:order
  })
});



module.exports = router;

function isLogIn(req, res, next) {
  if (req.session.isAuthenticated) {
    return next();
  }
  req.session.retUrl = req.url;
  res.redirect("/account/login");
}
