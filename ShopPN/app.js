const express = require("express");
const config = require("./config/default.json");
const mysql = require("mysql");
const favicon = require('serve-favicon');
const path = require("path");
const routes = require('./routes/upload_sp.route');
const fileUpload = require('express-fileupload');
//cart order

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const userRoutes = require('./routes/user.route');

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'quanao'
});
connection.connect();
global.db = connection;
//
const app = express();
// Cho phép lý dữ liệu từ form method POST
app.use(
  express.urlencoded({
    extended: true,
  })
);
//
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
require('./config/passport');

app.use(cookieParser());
require("./middlewares/session.mdw")(app);//goi middlewares/session.mdw.js
app.use(flash());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/public", express.static("public"));

require("./middlewares/views.mdw")(app);//goi middlewares/views.mdw.js
require("./middlewares/locals.mdw")(app);//goi middlewares/locals.mdw.js

// res.locals is an object passed to hbs engine
app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});


//khai bao dia chi home
//app.get("/", function (req, res) {res.render("home");});
app.use('/user', userRoutes);
//khai báo địa chỉ
/* app.use("/admin/categories", require("./routes/category.route"));
app.use("/admin/products", require("./routes/product.route")); */
app.use("/", require("./routes/home.route"));//trang chủ
app.use("/products", require("./routes/product.route"));//địa chỉ products ,bycatProducts
app.use("/account", require("./routes/account.route"));//khai bao dia chi account

app.use("/admin", require("./routes/admin.route"));//địa chỉ admin
app.use(fileUpload());//upload_images
app.use("/admin", require("./routes/upload_sp.route"));//địa chỉ admin


/* app.get("/bs", function (req, res) {
  res.sendFile(__dirname + "/bs.html");
}); */

app.use(function (req, res) {
  res.render("404", { layout: false });
});// thông báo lỗi

//localhost
const PORT = 3000;
app.listen(PORT, function () {
  console.log("Server is running at http://localhost:3000");
});
