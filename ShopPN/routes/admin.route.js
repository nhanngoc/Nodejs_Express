const express = require("express");
const db = require("../utils/db");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const Model = require("../models/admin_user.model");
const config = require("../config/default.json");
const multer = require("multer");

//register
//const {validationResult} = require('express-validator');
const { registerValidator } = require("../middlewares/validate.mdw");
//login//logout
const restrict = require("../middlewares/auth.mdw");
const router = express.Router();

//login
router.get("/", async function (req, res) {
  res.render("vwadmin/login" /* , { layout: false } */); //tat layout trang chu
});
router.post("/", async function (req, res) {
  const user = await Model.singleUserName(req.body.username);
  if (user === null) {
    return res.render("vwadmin/login", {
      err: "Sai tên hoặc mật khẩu.",
    });
  }
  const rs = bcrypt.compareSync(req.body.password, user.password);
  if (rs === false) {
    return res.render("vwadmin/login", {
      err: "Sai tên hoặc mật khẩu.",
    });
  }
  delete user.password;
  req.session.isAuthenticated = true;
  req.session.authUser = user;

  const url = req.query.retUrl || "/admin/home";
  res.redirect(url);
});

//logout
router.post("/logoutadmin", restrict.admin_nhanvien, function (req, res) {
  req.session.isAuthenticated = false;
  req.session.authUser = null;
  res.redirect("/admin");
});

//
//
//home admin
router.get("/home", restrict.admin_nhanvien, async function (req, res) {
  const user = await Model.total_user();
  const kho = await Model.total_kho();
  const daban = await Model.total_hoadon();
  const donmoi = await Model.total_donmoi();
  var total_kho =0;
  for (let i = 0; i < kho.length; i++) {
    total_kho += kho[i].soluong;
  }
  var total_ban =0;
  for (let i = 0; i < daban.length; i++) {
    total_ban += daban[i].soluong;
  }
  var total_donmoi =0;
  for (let i = 0; i < donmoi.length; i++) {
    total_donmoi ++;
  }
  const array = {
    total_user: user,
    total_kho: total_kho, 
    total_ban: total_ban,
    total_donmoi: total_donmoi,
  }
  res.render("_layouts/admin", { 
    layout: false,
    array: array,
  }); //tat layout trang chu
});

////////////////products////////////////
//attribute_list san pham thuoc tinh
router.get("/attribute/list", restrict.admin, async function (req, res) {
  const list = await Model.attr_products();
  const colors = await Model.distinct_colors();
  const sizes = await Model.distinct_sizes();
  let arrlist = [];
  for (let i = 0; i < list.length; i++) {
    const cls = []; //đỏ, xanh
    for (let j = 0; j < colors.length; j++) {
      if (list[i].MaSP == colors[j].masp) {
        //nếu 2 màu
        const sizesl = []; //nhiều size
        for (let k = 0; k < sizes.length; k++) {
          if (
            sizes[k].color_id == colors[j].color_id &&
            sizes[k].masp == colors[j].masp
          ) {
            sizesl.push(sizes[k]);
          }
        }
        const sl = {
          code: colors[j],
          items: sizesl, //1mau
        };
        console.log("sl", sl);
        cls.push(sl);
      }
    }
    const sp = {
      MaSP: list[i].MaSP,
      TenSP: list[i].TenSP,
      Anh: list[i].Anh,
      SoLuongBan: list[i].SoLuongBan,
      Gia: list[i].Gia,
      MoTa: list[i].MoTa,
      chatlieu: list[i].chatlieu,
      TinhTrang: list[i].TinhTrang,
      NgayNhap: list[i].NgayNhap,
      thuoctinh: cls, //thuoctinh:đỏ[size,soluong] color, size, soluong
    };
    console.log("spmoi", sp);
    arrlist.push(sp); // Thêm phần tử vào cuối mảng mới
  }
  console.log("arrlist", arrlist);
  res.render("vwadmin/products/attribute_list", {
    layout: "admin",
    sanpham: list,
    arrlist: arrlist,
    empty: list.length === 0,
  });
});
//attribute_add
router.get("/attribute/add", restrict.admin, async function (req, res) {
  const sanp = await Model._products();
  const attr_colors = await Model.attr_colors();
  const attr_sizes = await Model.attr_sizes();
  const list = await Model.attr_products();
  const colors = await Model.distinct_colors();
  const sizes = await Model.distinct_sizes();
  let arrlist = [];
  for (let i = 0; i < list.length; i++) {
    const cls = []; //đỏ, xanh
    for (let j = 0; j < colors.length; j++) {
      if (list[i].MaSP == colors[j].masp) {
        //nếu 2 màu
        const sizesl = []; //nhiều size
        for (let k = 0; k < sizes.length; k++) {
          if (
            sizes[k].color_id == colors[j].color_id &&
            sizes[k].masp == colors[j].masp
          ) {
            sizesl.push(sizes[k]);
          }
        }
        const sl = {
          code: colors[j],
          items: sizesl, //1mau
        };
        cls.push(sl);
      }
    }
    const sp = {
      MaSP: list[i].MaSP,
      TenSP: list[i].TenSP,
      SoLuong: list[i].SoLuong,
      //Gia:list[i].Gia,
      thuoctinh: cls, //thuoctinh:đỏ[size,soluong] color, size, soluong
    };
    arrlist.push(sp); // Thêm phần tử vào cuối mảng mới
  }
  res.render("vwadmin/products/attribute_add", {
    layout: "admin",
    sanpham: sanp,
    arrlist: arrlist,
    colors: attr_colors,
    sizes: attr_sizes,
    empty: list.length === 0,
  });
});
router.post("/attribute/add", restrict.admin, async function (req, res) {
  const size_ids = req.body.size_id;
  const sl = req.body.soluong;
  let entity = [];
  for (let i = 0; i < size_ids.length; i++) {
    for (let j = 0; j < sl.length; j++) {
      if (i == j) {
        const masp = req.body.MaSP;
        const color_id = req.body.color_id;
        const size_id = size_ids[i];
        const soluong = sl[j];
        let arr = [masp, color_id, size_id, soluong];
        entity.push(arr);
      }
    }
  }
  console.log("attribute:", entity);
  await db.insert_attr(entity);
  res.redirect("/admin/attribute/add");
});
//xóa attribute sanpham co thuoc tinh
router.get("/attribute/remove/:id", async function (req, res) {
  await Model.remove_attr(req.params.id);
  res.redirect("/admin/attribute/list");
});
//list thuộc tính attribute detail
router.get("/attribute/detail/:id", restrict.admin, async function (req, res) {
  const id = +req.params.id || -1;
  const rows_attr = await Model.single_attr_ct(id);
  res.render("vwadmin/products/attr", {
    layout: "admin",
    sanpham: rows_attr,
    empty: rows_attr.length === 0,
  });
});
//xóa attribute detail
router.get("/attr/remove/:id", async function (req, res) {
  await Model.remove_attr_detail(req.params.id);
  res.redirect("/admin/attribute/list");
});
//sua attribute detail
router.get("/attr/edit/:id", restrict.admin, async function (req, res) {
  const id = +req.params.id || -1;
  const rows = await Model.single_attr_detail(id);
  const sizes = await Model.sizes_list();
  if (rows.length === 0) res.send("lõi la lõi");
  const product = rows[0];
  return res.render("vwadmin/products/attr_edit", {
    layout: "admin",
    product,
    sizes: sizes,
  });
});
//cap nhat attribute detail
router.post("/attr/update", restrict.admin, async function (req, res) {
  await Model.patch_attr_detail(req.body);
  res.redirect("/admin/attribute/list");
});

//list san pham
router.get("/products/list", restrict.admin, async function (req, res) {
  const list = await Model._products();
  res.render("vwadmin/products/list", {
    layout: "admin",
    sanpham: list,
    empty: list.length === 0,
  });
});
//them upload_sp.route.js
//xóa sanpham và anhct
router.get("/products/remove/:id", async function (req, res) {
  await Model.remove_anhct(req.params.id);
  await Model.remove_pro(req.params.id);
  res.redirect("/admin/products/list");
});
//sua
router.get("/products/edit/:id", restrict.admin, async function (req, res) {
  const id = +req.params.id || -1;
  const rows = await Model.single_pro(id);
  if (rows.length === 0) res.send("lõi la lõi");
  const product = rows[0];
  if (!req.files)
    return res.render("vwadmin/products/edit", { layout: "admin", product });
});
//cap nhat
router.post("/products/update", restrict.admin, async function (req, res) {
  await Model.patch_pro(req.body);
  res.redirect("/admin/products/list");
});

////////////////category////////////////
//list
router.get("/category/list", restrict.admin, async function (req, res) {
  const list = await Model.all_category();
  res.render("vwadmin/categories/list", {
    layout: "admin",
    loaisp: list,
    empty: list.length === 0,
  });
});
//themn
router.get("/category/add", restrict.admin, async function (req, res) {
  const list = await Model.all_dm();
  res.render("vwadmin/categories/add", {
    layout: "admin",
    sanpham: list,
  });
});
//them
router.post("/category/add", restrict.admin, async function (req, res) {
  await Model.add_loai(req.body);
  res.redirect("/admin/category/add");
});
//xoa
router.get("/category/remove/:id", restrict.admin, async function (req, res) {
  const id = req.params.id;
  const distinct = await Model.distinct_category();
  const list = await Model.all_category();
  for (let i = 0; i < distinct.length; i++) {
    if (distinct[i].MaLoai == id) {
      return res.render("vwadmin/categories/list", {
        err: "Vì sự ràng buộc dữ liệu.",
        layout: "admin",
        loaisp: list,
        empty: list.length === 0,
      });
    }
  }
  await Model.remove_loai(id);
  res.redirect("/admin/category/list");
});
//sua
router.get("/category/edit/:id", restrict.admin, async function (req, res) {
  const id = req.params.id;
  const rows = await Model.single_loai(id);
  const loai = rows[0];
  res.render("vwadmin/categories/edit", { loai: loai, layout: "admin" });
});
//cap nhat
router.post("/category/update", restrict.admin, async function (req, res) {
  await Model.update_loai(req.body);
  res.redirect("/admin/category/list");
});
////////////////khách hàng////////////////
//list kh
router.get("/kh", restrict.admin_nhanvien, async function (req, res) {
  const list = await Model.all_kh();
  res.render("vwadmin/order/kh", {
    layout: "admin",
    khachhang: list,
    empty: list.length === 0,
  });
});
//hoadon theo makh
router.get("/kh/hoadon/:makh", restrict.admin_nhanvien, async function (req, res) {
  const list = await Model.all_hoadonkh(req.params.makh);
  res.render("vwadmin/order/hoadon", {
    layout: "admin",
    hoadon: list,
    empty: list.length === 0,
  });
});
//hoadon
router.get("/hoadon", restrict.admin_nhanvien, async function (req, res) {
  const list = await Model.all_hoadon();
  res.render("vwadmin/order/hoadon", {
    layout: "admin",
    hoadon: list,
    empty: list.length === 0,
  });
});
//hoadon chi tiet
router.get(
  "/hoadonct/:mahd",
  restrict.admin_nhanvien,
  async function (req, res) {
    const mahd = req.params.mahd;
    console.log("mahdd:", mahd);
    const list = await Model.all_hoadonct(mahd);
    console.log("dsct:", list);
    res.render("vwadmin/order/hoadonct", {
      layout: "admin",
      hoadonct: list,
      empty: list.length === 0,
    });
  }
);
/////START XỬ LÝ TRẠNG THÁI HÓA ĐƠN////
//sua hoadon
router.get("/hoadon/edit/:id", restrict.admin_nhanvien, async function (req, res) {
    const id = req.params.id;
    const rows = await Model.single_hd(id);
    const hoadon = rows[0];
    res.render("vwadmin/order/edit", { hoadon: hoadon, layout: "admin" });
  }
);
//cap nhat hoadon
router.post("/hoadon/update", restrict.admin_nhanvien, async function (req, res) {
    await Model.update_hd(req.body);
    res.redirect("/admin/hoadon/choxacnhan");
  }
);
//hoadon cho_xac_nhan
router.get("/hoadon/choxacnhan", restrict.admin_nhanvien, async function (req, res) {
    const list = await Model.single_choxacnhan();
    res.render("vwadmin/order/choxacnhan", {
      layout: "admin",
      hoadon: list,
      empty: list.length === 0,
    });
  }
);
//cap nhat hoadon cho_xac_nhan
router.get("/hoadon/choxacnhan/:mahd", restrict.admin_nhanvien, async function (req, res) {
    const mahd = req.params.mahd;
    const entity = {
      mahd: mahd,
      trangthai: "Đã xác nhận",
    };
    console.log("entity", entity);
    await Model.update_hd(entity);
    res.redirect("/admin/hoadon/choxacnhan");
  }
);
//
//hoadon da_xac_nhan
router.get("/hoadon/daxacnhan", restrict.admin_nhanvien, async function (req, res) {
    const list = await Model.single_daxacnhan();
    res.render("vwadmin/order/daxacnhan", {
      layout: "admin",
      hoadon: list,
      empty: list.length === 0,
    });
  }
);
//cap nhat hoadon  da_xac_nhan
router.get("/hoadon/daxacnhan/:mahd", restrict.admin_nhanvien, async function (req, res) {
    const mahd = req.params.mahd;
    const entity = {
      mahd: mahd,
      trangthai: "Đang giao",
    };
    console.log("entity", entity);
    await Model.update_hd(entity);
    res.redirect("/admin/hoadon/daxacnhan");
  }
);
//
//hoadon dang_giao
router.get("/hoadon/danggiao", restrict.admin_nhanvien, async function (req, res) {
    const list = await Model.single_danggiao();
    res.render("vwadmin/order/danggiao", {
      layout: "admin",
      hoadon: list,
      empty: list.length === 0,
    });
  }
);
//cap nhat hoadon  dang_giao
router.get("/hoadon/danggiao/:mahd", restrict.admin_nhanvien, async function (req, res) {
    const mahd = req.params.mahd;
    const entity = {
      mahd: mahd,
      trangthai: "Đã nhận hàng",
    };
    console.log("entity", entity);
    await Model.update_hd(entity);
    res.redirect("/admin/hoadon/danggiao");
  }
);
//
//hoadon da_nhan_hang
router.get("/hoadon/danhan", restrict.admin_nhanvien, async function (req, res) {
    const list = await Model.single_danhan();
    res.render("vwadmin/order/danhan", {
      layout: "admin",
      hoadon: list,
      empty: list.length === 0,
    });
  }
);
//
//hoadon da_huy
router.get("/hoadon/dahuy", restrict.admin_nhanvien, async function (req, res) {
  const list = await Model.single_dahuy();
  res.render("vwadmin/order/dahuy", {
    layout: "admin",
    hoadon: list,
    empty: list.length === 0,
  });
});
//cap nhat hoadon  da_huy
router.get("/hoadon/dahuy/:mahd", restrict.admin_nhanvien, async function (req, res) {
    const mahd = req.params.mahd;
    const entity = {
      mahd: mahd,
      trangthai: "Đã hủy",
    };
    await Model.update_hd(entity);
    const hd = await Model.hd_id(mahd);
    const spct = await Model.all_spct();
    for (let i = 0; i < hd.length; i++) {
      for (let j = 0; j < spct.length; j++) {
        if (hd[i].ma_id == spct[j].sp_id) {
          const entity = {
            sp_id: hd[i].ma_id,
            soluong: spct[j].soluong + hd[i].quantity,
          };
          await Model.update_spct(entity);
        }
      }
    }
    res.redirect("/admin/hoadon/dahuy");
  }
);
/////END XỬ LÝ TRẠNG THÁI HÓA ĐƠN////
////////////////End khách hàng////////////////

////////////////Start nhan vien ////////////////
//list nhan vien
router.get("/user", restrict.admin, async function (req, res) {
  const list = await Model.all_nv();
  res.render("vwadmin/quantri/quantri", {
    layout: "admin",
    quantri: list,
    empty: list.length === 0,
  });
});
//themn
router.get("/user/add", restrict.admin, async function (req, res) {
  const list = await Model.all_nv();
  res.render("vwadmin/quantri/add", {
    layout: "admin",
    sanpham: list,
  });
});
//them
router.post("/user/add", restrict.admin, async function (req, res) {
  const salt = bcrypt.genSaltSync(10);
  const password_hash = bcrypt.hashSync(req.body.password, salt);
  const entity = {
    tennv: req.body.tennv,
    gioitinh: req.body.gioitinh,
    ngaysinh: req.body.ngaysinh,
    email: req.body.email,
    sdt: req.body.sdt,
    username: req.body.username,
    password: password_hash,
    quyen: req.body.quyen,
  };
  await Model.add_nv(entity);
  res.redirect("/admin/user/add");
});
//xoa
router.get("/user/remove/:id", restrict.admin, async function (req, res) {
  await Model.remove_nv(req.params.id);
  res.redirect("/admin/user");
});
//sua
router.get("/user/edit/:id", restrict.admin, async function (req, res) {
  const id = req.params.id;
  const rows = await Model.single_nv(id);
  const qt = rows[0];
  res.render("vwadmin/quantri/edit", {
    quantri: qt,
    layout: "admin",
  });
});
//cap nhat
router.post("/user/update", restrict.admin, async function (req, res) {
  if (req.body.password === null) {
    const entity = {
      manv: req.body.manv,
      tennv: req.body.tennv,
      gioitinh: req.body.gioitinh,
      ngaysinh: req.body.ngaysinh,
      email: req.body.email,
      sdt: req.body.sdt,
      username: req.body.username,
      quyen: req.body.quyen,
    };
    console.log("body", req.body);
    await Model.update_nv(entity);
    res.redirect("/admin/user");
  }
  const salt = bcrypt.genSaltSync(10);
  const password_hash = bcrypt.hashSync(req.body.password, salt);
  const entity = {
    manv: req.body.manv,
    tennv: req.body.tennv,
    gioitinh: req.body.gioitinh,
    ngaysinh: req.body.ngaysinh,
    email: req.body.email,
    sdt: req.body.sdt,
    username: req.body.username,
    password: password_hash,
    quyen: req.body.quyen,
  };
  console.log("body", req.body);
  await Model.update_nv(entity);
  res.redirect("/admin/user");
});
////////////////Giảm Giá////////////////
//list giảm giá
router.get("/giamgia", restrict.admin, async function (req, res) {
  const list = await Model.all_gg();
  res.render("vwadmin/giamgia/giamgia", {
    layout: "admin",
    giamgia: list,
    empty: list.length === 0,
  });
});
//themn
router.get("/giamgia/add", restrict.admin, async function (req, res) {
  const list = await Model.all_sp_gg();
  res.render("vwadmin/giamgia/add", {
    layout: "admin",
    sanpham: list,
  });
});
//them
router.post("/giamgia/add", restrict.admin, async function (req, res) {
  const id = req.body.makm;
  const giakm = req.body.giakm;
  const list = await Model.all_sp_gg();
  const rows = await Model.id_sp_gg(id);
  const giagoc = rows[0].Gia;
  if (giakm > giagoc) {
    return res.render("vwadmin/giamgia/add", {
      err: "Giá khuyến mãi phải nhỏ hơn giá gốc.",
      layout: "admin",
      sanpham: list,
    });
  }
  await Model.add_gg(req.body);
  res.redirect("/admin/giamgia/add");
});
//xoa
router.get("/giamgia/remove/:id", restrict.admin, async function (req, res) {
  await Model.remove_gg(req.params.id);
  res.redirect("/admin/giamgia");
});
//sua
router.get("/giamgia/edit/:id", restrict.admin, async function (req, res) {
  const id = req.params.id;
  const rows = await Model.single_gg(id);
  const giamgia = rows[0];
  console.log("giamgia", giamgia);
  res.render("vwadmin/giamgia/edit", { giamgia: giamgia, layout: "admin" });
});
//cap nhat
router.post("/giamgia/update", restrict.admin, async function (req, res) {
  const entity = {
    makm: req.body.makm,
    giakm: req.body.giakm,
  };
  await Model.update_gg(entity);
  res.redirect("/admin/giamgia");
});
////////////////End Giảm Giá////////////////

module.exports = router;
