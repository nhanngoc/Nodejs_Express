const userModel = require("../models/user.model");
/* module.exports = function (req, res, next) {
  if (!req.session.isAuthenticated) {
    return res.redirect(`/account/login?retUrl=${req.originalUrl}`);
  }
  next();
}; */
module.exports = {
  user: async function (req, res, next) {
    const user = await userModel.singleUserName(req.body.username);
    if ((!req.session.isAuthenticated )&&( user != +req.params.username)) {
      return res.redirect(`/account/login?retUrl=${req.originalUrl}`);
    }
    next();
  },

  admin: function (req, res, next) {
    if (!req.session.isAuthenticated) {
      return res.redirect(`/admin/login?retUrl=${req.originalUrl}`);
    }
    next();
  },
};
