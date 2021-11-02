"use strict";

module.exports = function (req, res, next) {
  if (!req.session.isAuthenticated) {
    return res.redirect("/account/login?retUrl=".concat(req.originalUrl));
  }

  next();
};