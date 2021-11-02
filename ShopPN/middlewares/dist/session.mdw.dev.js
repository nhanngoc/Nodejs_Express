"use strict";

//login
var session = require("express-session");

module.exports = function (app) {
  //login
  app.set("trust proxy", 1); //trust first proxy

  app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {//secure: true
    }
  }));
};