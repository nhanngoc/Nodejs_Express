const userModel = require("../models/user.model");
const Model = require("../models/admin_user.model");
/* module.exports = function (req, res, next) {
  if (!req.session.isAuthenticated) {
    return res.redirect(`/account/login?retUrl=${req.originalUrl}`);
  }
  next();
}; */
module.exports = {
  user: async function (req, res, next) {
    const user = await userModel.singleUserName(req.body.username);
    if (!req.session.isAuthenticated && user != +req.params.username) {
      return res.redirect(`/account/login?retUrl=${req.originalUrl}`);
    }
    next();
  },
  isLoggedIn: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  },

  notLoggedIn: function (req, res, next) {
      if (!req.isAuthenticated()) {
          return next();
      }
      res.redirect('/');
  },

  admin: async function (req, res, next) {
    const user = await Model.singleUserName_ad(req.body.username);
    console.log("user",user)
    if (!req.session.isAuthenticated && user != +req.params.username) {
      return res.redirect(`/admin/login?retUrl=${req.originalUrl}`);
    }
    next();
  },
  admin_nhanvien: async function (req, res, next) {
    const user = await Model.singleUserName(req.body.username);
    console.log("user_nv",user)
    if (!req.session.isAuthenticated && user != +req.params.username) {
      return res.redirect(`/admin/login?retUrl=${req.originalUrl}`);
    }
    next();
  },
};
