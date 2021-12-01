const express = require("express");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const Model = require("../models/admin_user.model");
const config = require("../config/default.json");
const multer = require("multer");

//register
//const {validationResult} = require('express-validator');
const  { registerValidator } = require("../middlewares/validate.mdw");
//login//logout
const restrict = require("../middlewares/auth.mdw");
const router = express.Router();

//login
router.get("/", async function (req, res) {
  res.render("vwadmin/login", { layout: false }); //tat layout trang chu
});
router.post("/", async function (req, res) {
  const user = await Model.singleUserName(req.body.username);
  if (user === null) {
    return res.render("vwadmin/login", {
      layout: false,
      err: "Invalid username or password.",
    });
  }
  const rs = bcrypt.compareSync(req.body.password, user.password);
  if (rs === false) {
    return res.render("vwadmin/login", {
      layout: false,
      err: "Invalid username or password.",
    });
  }
  delete user.password;
  req.session.isAuthenticated = true;
  req.session.authUser = user;

  const url = req.query.retUrl || "/admin/home";
  res.redirect(url);
});

//logout
router.post("/logoutadmin", restrict.admin, function (req, res) {
  req.session.isAuthenticated = false;
  req.session.authUser = null;
  res.redirect("/admin");
});

//
//
//home admin
router.get("/home", restrict.admin, async function (req, res) {
  console.log(req.session.authUser);
  res.render("_layouts/admin", { layout: false });//tat layout trang chu
});
/* router.get("/is-available", async function (req, res) {
 const user = await Model.singleUserName(req.query.user);
  if(!user){
    return res.json(true);
  }
  res.json(false);
}); */

////////////////products////////////////
//list 
router.get("/products/list", restrict.admin, async function (req, res) {
  const list = await Model.all_products();
  res.render("vwadmin/products/list", {
    layout: "admin",
    sanpham: list,
    empty: list.length === 0,
  });
});
//them upload_sp.route.js
//xoa
router.get("/products/remove/:id", async function (req, res) {
  await Model.remove(req.params.id);
  res.redirect("/admin/products/list");
});
//sua
router.get("/products/edit/:id",restrict.admin, async function (req, res) {
  const id = +req.params.id || -1;
  const rows = await Model.single(id);
  if (rows.length === 0) res.send("lõi la lõi");
  const product = rows[0];
  if (!req.files)
   return res.render("vwadmin/products/edit", {layout: "admin", product });
});
//cap nhat
router.post("/products/update",restrict.admin, async function (req, res) {
  await Model.patch(req.body);
  res.redirect("/admin/products/list");
});

////////////////category////////////////
//list 
router.get("/category/list", restrict.admin, async function (req, res) {
  const list = await Model.all_category();
  res.render("vwadmin/categories/list", {
    layout: "admin",
    loaisp: list,
    empty: list.length === 0,
  });
});
////////////////khách hàng////////////////
//list kh
router.get("/kh", restrict.admin, async function (req, res) {
  const list = await Model.all_kh();
  res.render("vwadmin/order/kh", {
    layout: "admin",
    khachhang: list,
    empty: list.length === 0,
  });
});


////////////////tai khoan admin////////////////
//list taikhoan
router.get("/user", restrict.admin, async function (req, res) {
  const list = await Model.all_tk();
  res.render("vwadmin/taikhoan/user", {
    layout: "admin",
    tai_khoan: list,
    empty: list.length === 0,
  });
});




module.exports = router;
