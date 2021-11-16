const express = require("express");
const config = require("./config/default.json");
const mysql = require("mysql");
//const multer = require("multer");
const path = require("path");
const routes = require('./routes/upload_sp.route')
const fileUpload = require('express-fileupload')

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'quanao'
});
connection.connect();
global.db = connection;


const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

//khai báo địa chỉ
app.use("/public", express.static("public"));

//goi middlewares/session.mdw.js
require("./middlewares/session.mdw")(app);
//goi middlewares/views.mdw.js
require("./middlewares/views.mdw")(app);
//goi middlewares/locals.mdw.js
require("./middlewares/locals.mdw")(app);

//khai bao dia chi home
//app.get("/", function (req, res) {res.render("home");});
app.use("/", require("./routes/home.route"));

//nhanvien
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
//khai báo địa chỉ
/* app.use("/admin/categories", require("./routes/category.route"));
app.use("/admin/products", require("./routes/product.route")); */

//địa chỉ products ,bycatProducts
app.use("/products", require("./routes/product.route"));

//khai bao dia chi account
app.use("/account", require("./routes/account.route"));

//địa chỉ admin
app.use("/admin", require("./routes/admin.route"));

// ROUTES
app.get('/anhh',function(req,res){
  res.sendFile(__dirname + '/file.html');
})
app.use(fileUpload());

app.get('/admin/products/add', routes.index);//call for main index page
app.post('/admin/products/add', routes.index);//call for signup post 
//app.get('/profile/:id',routes.profile);







//trang thông báo lỗi
app.use(function (req, res) {
  res.render("404", { layout: false });
});

//localhost
const PORT = 3000;
app.listen(PORT, function () {
  console.log("Server is running at http://localhost:3000");
});
