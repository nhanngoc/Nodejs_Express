const categoryModel = require("../models/category.model");
const khModel = require("../models/order.model");
const Cart = require("../models/cart");
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
};
