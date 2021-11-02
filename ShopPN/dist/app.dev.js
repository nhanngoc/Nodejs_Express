"use strict";

var express = require("express");

var config = require("./config/default.json");

var mysql = require("mysql");

var app = express();
app.use(express.urlencoded({
  extended: true
})); //khai báo địa chỉ

app.use("/public", express["static"]("public")); //goi middlewares/session.mdw.js

require("./middlewares/session.mdw")(app); //goi middlewares/views.mdw.js


require("./middlewares/views.mdw")(app); //goi middlewares/locals.mdw.js


require("./middlewares/locals.mdw")(app); //khai bao dia chi home
//app.get("/", function (req, res) {res.render("home");});


app.use("/", require("./routes/home.route")); //nhanvien

app.use("/admin/nhanvien", require("./routes/nhanvien.route"));
app.get("/about", function (req, res) {
  res.render("about");
});
app.get("/bs", function (req, res) {
  res.sendFile(__dirname + "/bs.html");
}); //khai báo địa chỉ

app.use("/admin/categories", require("./routes/category.route"));
app.use("/admin/products", require("./routes/product.route"));
app.use("/products", require("./routes/product.route")); //khai bao dia chi account

app.use("/account", require("./routes/account.route")); //trang thông báo lỗi

app.use(function (req, res) {
  res.render("404", {
    layout: false
  });
}); //localhost

var PORT = 3000;
app.listen(PORT, function () {
  console.log("Server is running at http://localhost:3000");
});