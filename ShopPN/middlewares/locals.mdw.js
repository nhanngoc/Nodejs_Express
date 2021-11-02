const categoryModel = require("../models/category.model");
module.exports = function (app) {
  //login
  app.use(function (req, res, next) {
    if (req.session.isAuthenticated === null) {
      req.session.isAuthenticated = false;
    }
    res.locals.lcIsAuthenticated = req.session.isAuthenticated;
    res.locals.lcAuthUser = req.session.authUser;
    next();
  });
  //lấy ra loại sản phẩm
  const categoryModel = require("../models/category.model");
  app.use(async function (req, res, next) {
    const rows = await categoryModel.allDetails();
    res.locals.lcCategories = rows;
    next();
  });
};
