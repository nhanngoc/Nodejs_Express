const Model = require("../models/admin_user.model");


//thêm sản phẩm mới
exports.index = async function(req, res){
    message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var maloai= post.MaLoai;
      var ten= post.TenSP;
      var sl= post.SoLuong;
      var gia= post.Gia;
      /* var size= post.Size; */
      var mota= post.MoTa;
      var ngaynhap=post.NgayNhap
	  if (!req.files)
			return res.status(400).send('No files were uploaded.');
         var file = req.files.uploaded_image;
         var img_name=file.name;
         if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){         
               file.mv('public/images/'+file.name, function(err) {
                  if (err)
                     return res.status(500).send(err);
                        var sql = "INSERT INTO `sanpham`(`MaLoai`,`TenSP`,`Anh`,`SoLuong`,`Gia`,`MoTa`,`NgayNhap`) VALUES ('" + maloai + "','" + ten + "','" + img_name + "','" + sl + "','" + gia + "','" + mota + "','" + ngaynhap + "')";
   
                        var query = db.query(sql, function(err, result) {
                           res.render("vwadmin/products/add",{layout: "admin"});
                        });
                     });
         } else {
            message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
            res.render('vwadmin/products/add.hbs',{message: message});
         }
   } else {
      const list = await Model.all_category();
      res.render("vwadmin/products/add",{layout: "admin",loaisp: list,});
   }
 
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