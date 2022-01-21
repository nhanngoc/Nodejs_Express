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
    //console.log("userr",user)
    if (!req.session.isAuthenticated && user != +req.params.username) {
      return res.redirect(`/account/login?retUrl=${req.originalUrl}`);
    }
    next();
  },
  isLoggedIn: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  },

  notLoggedIn: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  },
  //PHÂN QUYỀN
  admin: async function (req, res, next) {
    const user = await Model.singleUserName_ad(req.body.username);
    //console.log("useradmin", user);
    if (!req.session.isAuthenticated) {
      return res.redirect(`/admin/login?retUrl=${req.originalUrl}`);
    }
    for (let i = 0; i < user.length; i++) {
      if (user[i].username === req.session.authUser.username) {
        next();
        return;
      }
    }
    //console.log("req.session", req.session.isAuthenticated);
    res.redirect(`/admin/login?retUrl=${req.originalUrl}`);
  },
  //PHÂN QUYỀN
  admin_nhanvien: async function (req, res, next) {
    const user = await Model.singleUserName_all(req.body.username);
    if (!req.session.isAuthenticated) {
      return res.redirect(`/admin/login?retUrl=${req.originalUrl}`,
      /* {
        err:"Bạn không có quyền truy cập"
      } */);
    }
    for (let i = 0; i < user.length; i++) {
      if (user[i].username === req.session.authUser.username) {
        next();
        return;
      }
    }
    res.redirect(`/admin/login?retUrl=${req.originalUrl}`,
    /* {
      err:"Bạn không có quyền truy cập"
    } */);
  },
};
