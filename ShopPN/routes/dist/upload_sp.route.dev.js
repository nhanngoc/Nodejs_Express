"use strict";

var Model = require("../models/admin_user.model"); //thêm sản phẩm mới


exports.index = function _callee(req, res) {
  var post, maloai, ten, sl, gia, mota, ngaynhap, file, img_name, list;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          message = '';

          if (!(req.method == "POST")) {
            _context.next = 16;
            break;
          }

          post = req.body;
          maloai = post.MaLoai;
          ten = post.TenSP;
          sl = post.SoLuong;
          gia = post.Gia;
          /* var size= post.Size; */

          mota = post.MoTa;
          ngaynhap = post.NgayNhap;

          if (req.files) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", res.status(400).send('No files were uploaded.'));

        case 11:
          file = req.files.uploaded_image;
          img_name = file.name;

          if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {
            file.mv('public/images/' + file.name, function (err) {
              if (err) return res.status(500).send(err);
              var sql = "INSERT INTO `sanpham`(`MaLoai`,`TenSP`,`Anh`,`SoLuong`,`Gia`,`MoTa`,`NgayNhap`) VALUES ('" + maloai + "','" + ten + "','" + img_name + "','" + sl + "','" + gia + "','" + mota + "','" + ngaynhap + "')";
              var query = db.query(sql, function (err, result) {
                res.render("vwadmin/products/add", {
                  layout: "admin"
                });
              });
            });
          } else {
            message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
            res.render('vwadmin/products/add.hbs', {
              message: message
            });
          }

          _context.next = 20;
          break;

        case 16:
          _context.next = 18;
          return regeneratorRuntime.awrap(Model.all_category());

        case 18:
          list = _context.sent;
          res.render("vwadmin/products/add", {
            layout: "admin",
            loaisp: list
          });

        case 20:
        case "end":
          return _context.stop();
      }
    }
  });
};
/* exports.profile = function(req, res){
	var message = '';
	var id = req.params.id;
    var sql="SELECT * FROM `users_image` WHERE `id`='"+id+"'"; 
    db.query(sql, function(err, result){
	  if(result.length <= 0)
	  message = "Profile not found!";
	  
      res.render('profile.ejs',{data:result, message: message});
   });
}; */