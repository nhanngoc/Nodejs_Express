const express = require("express");
const moment = require("moment");
const Joi = require('joi');
const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const config = require("../config/default.json");
//register
//const {validationResult} = require('express-validator');
const {registerValidator}  = require("../middlewares/validate.mdw");
//login//logout
const restrict = require("../middlewares/auth.mdw");
const router = express.Router();


router.get("/login", async function (req, res) {
  res.render("vwaccount/login", { layout: false }); //tat layout trang chu
});
router.post("/login", async function (req, res) {
  const user = await userModel.singleUserName(req.body.username);
  if (user === null) {
    return res.render("vwaccount/login", {
      layout: false,
      err: "Invalid username or password.",
    });
  }
  const rs = bcrypt.compareSync(req.body.password, user.password);
  if (rs === false) {
    return res.render("vwaccount/login", {
      layout: false,
      err: "Invalid username or password.",
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
  const user = await userModel.singleUserName(req.body.username);
  if (user === +req.params.username) {
    throw new 'Username "' + params.username + '" is already taken';
  }
  /* if (error){
    throw res.status(422).send(error.details[0].message);
  }  */
    if (error) {
      throw res.status(422).send(error.details[0].message);
  } 
  //const checkEmailExist = await userModel.findOne({ email: req.body.email });
  //if (checkEmailExist) return res.status(422).send('Email is exist');

  const salt = bcrypt.genSaltSync(10);
  const password_hash = bcrypt.hashSync(req.body.password, salt);
  const entity = {
    tenkh: req.body.tenkh,
    username: req.body.username,
    password: password_hash,
    email: req.body.email,
// gioitinh: req.body.gioitinh,
    diachi: req.body.diachi,
    sdt: req.body.sdt,
  };
  try{
    await userModel.add_kh(entity); //đẩy database
    res.render("vwaccount/register");
  }catch(err){
    res.status(400).send(err);
  }
 
});

//login profile
router.get("/profile", restrict.user, async function (req, res) {
  console.log(req.session.authUser);
  res.render("vwaccount/profile");
});

/* router.get("/is-available", async function (req, res) {
 const user = await userModel.singleUserName(req.query.user);
  if(!user){
    return res.json(true);
  }
  res.json(false);
}); */


module.exports = router;
