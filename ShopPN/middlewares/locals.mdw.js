const categoryModel = require("../models/category.model");
const khModel = require("../models/order.model");
const Cart = require("../models/cart");
const adminModel = require("../models/admin_user.model");
module.exports = function (app) {
  //login
  app.use(function (req, res, next) {
    if (req.session.isAuthenticated === null) {
      req.session.isAuthenticated = false;
    }
    res.locals.lcIsAuthenticated = req.session.isAuthenticated;
    //console.log("lcIsAuthenticated",res.locals.lcIsAuthenticated)
    res.locals.lcAuthUser = req.session.authUser;
    //console.log("lcAuthUser",res.locals.lcAuthUser)
    next();
  });
  //lấy ra danh sách tài khoản khách hàng
  app.use(async function (req, res, next) {
    const rows = await khModel.all_khanhhang();
    res.locals.khachhang = rows;
    next();
  });

  //lấy ra loại danh muc bé gái
  const categoryModel = require("../models/category.model");
  app.use(async function (req, res, next) {
    const rows = await categoryModel.danhmuc0();
    res.locals.lcCategories = rows;
    next();
  });
  //lấy ra danh muc bé trai
  app.use(async function (req, res, next) {
    const rows = await categoryModel.danhmuc1();
    res.locals.lcCategories1 = rows;
    next();
  });
  //lây ra danh muc phụ kiện
  app.use(async function (req, res, next) {
    const rows = await categoryModel.danhmuc2();
    res.locals.lcCategories2 = rows;
    next();
  });
  
 //lấy ra size
 const sizeModel = require("../models/product.model");
 app.use(async function (req, res, next) {
   const rows = await sizeModel.size();
   res.locals.sizes = rows;
   next();
 });
 ////Start ADMIN ////
 //lấy ra hóa đơn choxacnhan bên admin
 app.use(async function (req, res, next) {
   const list = await adminModel.single_choxacnhan();
   var count = 0;
   for (let i = 0; i < list.length; i++) {
    count ++;
   }
   res.locals.choxacnhan = count;
   //console.log("choxacnhan",res.locals.choxacnhan)
   next();
 });
  //lấy ra hóa đơn daxacnhan bên admin
  app.use(async function (req, res, next) {
    const list = await adminModel.single_daxacnhan();
    var count = 0;
    for (let i = 0; i < list.length; i++) {
     count ++;
    }
    res.locals.daxacnhan = count;
    next();
  });
 //lấy ra hóa đơn danggiao bên admin
 app.use(async function (req, res, next) {
   const list = await adminModel.single_danggiao();
   var count = 0;
   for (let i = 0; i < list.length; i++) {
    count ++;
   }
   res.locals.danggiao = count;
   next();
 });
 //lấy ra hóa đơn danhan bên admin
 app.use(async function (req, res, next) {
   const list = await adminModel.single_danhan();
   var count = 0;
   for (let i = 0; i < list.length; i++) {
    count ++;
   }
   res.locals.danhan = count;
   next();
 });
 //lấy ra hóa đơn dahuy bên admin
 app.use(async function (req, res, next) {
   const list = await adminModel.single_dahuy();
   var count = 0;
   for (let i = 0; i < list.length; i++) {
    count ++;
   }
   res.locals.dahuy = count;
   next();
 });

 
};
