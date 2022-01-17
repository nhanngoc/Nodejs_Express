const express = require("express");
const moment = require("moment");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const config = require("../config/default.json");
const orderModel = require("../models/order.model");
const Cart = require("../models/cart");
//register
//const {validationResult} = require('express-validator');
const { registerValidator } = require("../middlewares/validate.mdw");
//login//logout
const restrict = require("../middlewares/auth.mdw");
const router = express.Router();

router.get("/login", async function (req, res) {
  res.render("vwaccount/login"); //tat layout trang chu
});
router.post("/login", async function (req, res) {
  const user = await userModel.singleUserName(req.body.username);
  if (user === null) {
    return res.render("vwaccount/login", {
      //layout: false,
      err: "Sai tên hoặc mật khẩu.",
    });
  }
  const rs = bcrypt.compareSync(req.body.password, user.password);
  console.log("matkhau", rs);
  if (rs === false) {
    return res.render("vwaccount/login", {
      //layout: false,
      err: "Sai tên hoặc mật khẩu.",
    });
  }
  delete user.password;
  req.session.isAuthenticated = true;
  req.session.authUser = user;
  const url = req.query.retUrl || "/";
  res.redirect(url);
});

//logout
router.post("/logout", restrict.user, function (req, res) {
  req.session.isAuthenticated = false;
  req.session.authUser = null;
  res.redirect(req.headers.referer);
});

//register
router.get("/register", async function (req, res) {
  res.render("vwaccount/register");
});
//register, response request
router.post("/register", async function (req, res, next) {
  const { error, value } = registerValidator(req.body);
  // validate
  const user = await userModel.all();
  for(var i = 0; i < user.length; i++){
    if (user[i].username == req.body.username) {
      return res.render("vwaccount/register", { 
        err: "Tên tài khoản đã tồn tại!",
        tenkh: req.body.tenkh,
        email: req.body.email,
        sdt: req.body.sdt,
        password:req.body.password,
        confirm:req.body.confirm,
        diachi: req.body.diachi,
        phuong_xa: req.body.phuong_xa,
        quan_huyen: req.body.quan_huyen,
        tinh: req.body.tinh,
      });
      
    }
  }
  const salt = bcrypt.genSaltSync(10);
  const password_hash = bcrypt.hashSync(req.body.password, salt);
  const entity = {
    tenkh: req.body.tenkh,
    username: req.body.username,
    password: password_hash,
    email: req.body.email,
    sdt: req.body.sdt,
    phuong_xa: req.body.phuong_xa,
    quan_huyen: req.body.quan_huyen,
    tinh: req.body.tinh,
    diachi: req.body.diachi,
  };
  await userModel.add_kh(entity); // luu database
  res.redirect("/account/register/success");
});

//success
router.get("/register/success", async function (req, res) {
  res.render("vwaccount/success");
});
//login profile
/* router.get("/profile", restrict.user, async function (req, res) {
  console.log(req.session.authUser);
  res.render("vwaccount/profile");
}); */

//login profile
router.get("/profile", restrict.user, async function (req, res) {
  const userr = req.session.authUser;
  const makh = userr.MaKH;
  const user = await orderModel.all_kh_makh(makh);
  const total1 = await orderModel.total_choxacnhan(makh);
  const total2 = await orderModel.total_daxacnhan(makh);
  const total3 = await orderModel.total_danggiao(makh);
  const total4 = await orderModel.total_danhanhang(makh);
  const total5 = await orderModel.total_dahuy(makh);

  res.render("vwaccount/profile", {
    user: user,
    total1: total1,
    total2: total2,
    total3: total3,
    total4: total4,
    total5: total5,
  });
});
/* router.get("/is-available", async function (req, res) {
 const user = await userModel.singleUserName(req.query.user);
  if(!user){
    return res.json(true);
  }
  res.json(false);
}); */
//xem danh sách đơn đặt hàng
router.get("/profile/order", restrict.user, async function (req, res) {
  const user = req.session.authUser;
  console.log("khachhang", user);
  const makh = user.MaKH;
  const order = await orderModel.all_order_makh(makh);
  console.log("order", order);
  res.render("vwaccount/order", { order: order });
});
//xem danh sách chi tiết đơn đặt hàng
router.get("/profile/order/:id", restrict.user, async function (req, res) {
  const mahd = req.params.id;
  const user = req.session.authUser;
  const order_mahd = await orderModel.all_order_mahd(mahd);
  const order_detail = await orderModel.all_order_ct(mahd);
  console.log("order_detail", order_detail);
  res.render("vwaccount/order_detail", {
    order_detail: order_detail,
    order_mahd: order_mahd,
  });
});
//1xem danh sách choxacnhan đơn đặt hàng
router.get("/profile/choxacnhan", restrict.user, async function (req, res) {
  const user = req.session.authUser;
  const makh = user.MaKH;
  const order = await orderModel.all_order_choxacnhan(makh);
  var total = 0;
  for (let i = 0; i < order.length; i++) {
    total++;
  }
  res.render("vwaccount/order_huy", { order: order, total: total });
});
//huydon tu khach hang
router.get("/profile/dahuy/:mahd", restrict.user, async function (req, res) {
  const mahd = req.params.mahd;
  const entity = {
    mahd: mahd,
    trangthai: "Đã hủy",
  };
  //console.log("entity", entity);
  await orderModel.update_hd(entity);
  const hd = await orderModel.hd_id(mahd);
  const spct = await orderModel.all_spct();
  for (let i = 0; i < hd.length; i++) {
    for (let j = 0; j < spct.length; j++) {
      if (hd[i].ma_id == spct[j].sp_id) {
        const entity = {
          sp_id: hd[i].ma_id,
          soluong: spct[j].soluong + hd[i].quantity,
        };
        await orderModel.update_spct(entity);
      }
    }
  }
  res.redirect("/account/profile/choxacnhan");
});
//2xem danh sách daxacnhan đơn đặt hàng
router.get("/profile/daxacnhan", restrict.user, async function (req, res) {
  const user = req.session.authUser;
  const makh = user.MaKH;
  const order = await orderModel.all_order_daxacnhan(makh);
  var total = 0;
  for (let i = 0; i < order.length; i++) {
    total++;
  }
  res.render("vwaccount/order_tt", { order: order, total: total });
});
//3xem danh sách danggiao đơn đặt hàng
router.get("/profile/danggiao", restrict.user, async function (req, res) {
  const user = req.session.authUser;
  const makh = user.MaKH;
  const order = await orderModel.all_order_danggiao(makh);
  var total = 0;
  for (let i = 0; i < order.length; i++) {
    total++;
  }
  res.render("vwaccount/order_tt", { order: order, total: total });
});
//4xem danh sách danhanhang đơn đặt hàng
router.get("/profile/danhan", restrict.user, async function (req, res) {
  const user = req.session.authUser;
  const makh = user.MaKH;
  const order = await orderModel.all_order_danhanhang(makh);
  var total = 0;
  for (let i = 0; i < order.length; i++) {
    total++;
  }
  res.render("vwaccount/order_tt", { order: order, total: total });
});
//5xem danh sách dahuy đơn đặt hàng
router.get("/profile/dahuy", restrict.user, async function (req, res) {
  const user = req.session.authUser;
  const makh = user.MaKH;
  const order = await orderModel.all_order_dahuy(makh);
  var total = 0;
  for (let i = 0; i < order.length; i++) {
    total++;
  }
  res.render("vwaccount/order_tt", { order: order, total: total });
});
//sua thông tin tài khoản khách hàng
router.get("/profile/edit", restrict.user, async function (req, res) {
  const user = req.session.authUser;
  const makh = user.MaKH;
  const rows = await orderModel.single_kh(makh);
  const edit = rows[0];
  console.log("edit", edit);
  res.render("vwaccount/edit_account", { edit: edit });
});
//cập nhật thông tin tài khoản khách hàng
router.post("/profile/edit", restrict.user, async function (req, res) {
  const user = req.session.authUser;
  const makh = user.MaKH;
  const entity = {
    MaKH: makh,
    tenkh: req.body.tenkh,
    username: req.body.username,
    email: req.body.email,
    sdt: req.body.sdt,
  };
  await orderModel.update_khachhang(entity);
  res.redirect("/account/profile");
});
//sửa thông tin địa chỉ tài khoản khách hàng
router.get("/profile/address", restrict.user, async function (req, res) {
  const user = req.session.authUser;
  const makh = user.MaKH;
  const rows = await orderModel.single_kh(makh);
  const edit = rows[0];
  res.render("vwaccount/edit_address", { edit: edit });
});
//cập nhật đổi thông tin địa chỉ khách hàng
router.post("/profile/address", restrict.user, async function (req, res) {
  const user = req.session.authUser;
  const makh = user.MaKH;
  const entity = {
    MaKH: makh,
    diachi: req.body.diachi,
    phuong_xa: req.body.phuong_xa,
    quan_huyen: req.body.quan_huyen,
    tinh: req.body.tinh,
  };
  await orderModel.update_khachhang(entity);
  res.redirect("/account/profile");
});
//sua thông tin mật khẩu khách hàng
router.get("/profile/password", restrict.user, async function (req, res) {
  const user = req.session.authUser;
  const makh = user.MaKH;
  const rows = await orderModel.single_kh(makh);
  const edit = rows[0];
  res.render("vwaccount/edit_password", { edit: edit });
});
//cập nhật đổi mật khẩu khách hàng
router.post("/profile/password", restrict.user, async function (req, res) {
  const user = req.session.authUser;
  const makh = user.MaKH;
  const salt = bcrypt.genSaltSync(10);
  const password_hash = bcrypt.hashSync(req.body.password, salt);
  const entity = {
    MaKH: makh,
    password: password_hash,
  };
  await orderModel.update_khachhang(entity);
  res.redirect("/account/profile");
});

module.exports = router;
