"use strict";

var express = require("express");

var config = require("./config/default.json");

var mysql = require("mysql"); //const multer = require("multer");


var favicon = require('serve-favicon');

var path = require("path");

var routes = require('./routes/upload_sp.route');

var fileUpload = require('express-fileupload'); //cart order


var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');

var passport = require('passport');

var flash = require('connect-flash');

var userRoutes = require('./routes/user.route');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'quanao'
});
connection.connect();
global.db = connection; //

var app = express();
app.use(express.urlencoded({
  extended: true
})); //

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

require('./config/passport');

app.use(cookieParser());

require("./middlewares/session.mdw")(app); //goi middlewares/session.mdw.js


app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/public", express["static"]("public"));

require("./middlewares/views.mdw")(app); //goi middlewares/views.mdw.js


require("./middlewares/locals.mdw")(app); //goi middlewares/locals.mdw.js
// res.locals is an object passed to hbs engine


app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
}); //khai bao dia chi home
//app.get("/", function (req, res) {res.render("home");});

app.use('/user', userRoutes); //khai báo địa chỉ

/* app.use("/admin/categories", require("./routes/category.route"));
app.use("/admin/products", require("./routes/product.route")); */

app.use("/", require("./routes/home.route")); //trang chủ

app.use("/products", require("./routes/product.route")); //địa chỉ products ,bycatProducts

app.use("/account", require("./routes/account.route")); //khai bao dia chi account

app.use("/admin", require("./routes/admin.route")); //địa chỉ admin

app.use(fileUpload()); //upload_images

app.get('/admin/products/add', routes.index); //call for main index page

app.post('/admin/products/add', routes.index); //call for signup post 
//app.get('/profile/:id',routes.profile);
// cart html

app.get('/carthtml', function (req, res) {
  res.sendFile(__dirname + '/cart.html');
}); // ROUTES

app.get('/anhh', function (req, res) {
  res.sendFile(__dirname + '/file.html');
}); //nhanvien

app.use("/admin/nhanvien", require("./routes/nhanvien.route"));
app.get("/about", function (req, res) {
  res.render("about");
});
app.get("/bs", function (req, res) {
  res.sendFile(__dirname + "/bs.html");
});
app.get("/bb", function (req, res) {
  res.sendFile(__dirname + "/bb.html");
});
app.get("/check", function (req, res) {
  res.sendFile(__dirname + "/checkout.html");
});
app.get("/nn", function (req, res) {
  res.sendFile(__dirname + "/ax.html");
});
app.use(function (req, res) {
  res.render("404", {
    layout: false
  });
}); // thông báo lỗi
//localhost

var PORT = 3000;
app.listen(PORT, function () {
  console.log("Server is running at http://localhost:3000");
});