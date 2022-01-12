const Model = require("../models/admin_user.model");
const express = require("express");
const db = require("../utils/db");
const router = express.Router();
const restrict = require("../middlewares/auth.mdw");

router.get("/products/add", restrict.admin, async function (req, res) {
  const list = await Model.all_category();
  res.render("vwadmin/products/add", { layout: "admin", loaisp: list });
});

//thêm sản phẩm mới
router.post("/products/add", async function (req, res, next) {
  const list = await Model.all_category();
  message = "";
  var today = new Date();
  var date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  var post = req.body;
  var maloai = post.MaLoai;
  var ten = post.TenSP;
  var gia = post.Gia;
  var mota = post.MoTa;
  var chatlieu = post.chatlieu;
  var ngaynhap = date;

  /* if (!req.files)
      return res.status(400).send("Không có tệp nào được tải lên.");
 */
  if (!req.files) {
    return res.render("vwadmin/products/add", {
      err: "Không có tệp nào được tải lên.",
      layout: "admin",
      loaisp: list,
    });
  }
  var file = req.files.uploaded_image;
  var mutilfile = req.files.many_files;
  var img_name = file.name;

  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/gif"
  ) {
    mutilfile.map((item, index) => {
      item.mv("public/images/detail/" + item.name, async function (err) {
        console.log("Lưu nhiều hình ảnh thành công", item);
      });
    });

    file.mv("public/images/" + file.name, async function (err) {
      if (err) return res.status(500).send(err);
      const entity = {
        MaLoai: maloai,
        TenSP: ten,
        Anh: img_name,
        Gia: gia,
        MoTa: mota,
        chatlieu: chatlieu,
        ngaynhap: ngaynhap,
      };
      await Model.add_pro(entity);
      const idsp = await Model.id_sp();
      let arrlist = [];
      for (let i = 0; i < mutilfile.length; i++) {
        const MaSP = idsp;
        const anh_ten = mutilfile[i].name;
        let arr = [MaSP, anh_ten];
        arrlist.push(arr);
      }
      console.log("arrlist:", arrlist);
      await db.insert_mutilfile(arrlist);
      res.redirect("/admin/products/add");
    });
  } else {
    message =
      "Định dạng này không được phép,vui lòng tải lên '.png','.gif','.jpg'";
    res.render("vwadmin/products/add", {
      message: message,
      layout: "admin",
      loaisp: list,
    });
  }
});

module.exports = router;
