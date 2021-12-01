const express = require("express");
const productModel = require("../models/product.model");
const config = require("../config/default.json");
const router = express.Router();

//xuat danh sach san pham
router.get("/list", async function (req, res) {
  //const list = await productModel.all();
  for (const c of res.locals.lcCategories) {
    if (c.MaLoai === +req.params.MaLoai) {
      c.isActive = true;
    }
  }
  //phan trang
  const page = +req.query.page || 1;
  if (page < 0) page = 1;
  const offset = (page - 1) * config.pagination.limit;
  const list = await productModel.pageByHome(
    req.params.MaLoai,
    config.pagination.limit,
    offset
  );
  const total = await productModel.countByCat();
  const nPages = Math.ceil(total / config.pagination.limit);
  const page_items = [];
  for (let i = 1; i <= nPages; i++) {
    const item = {
      value: i,
      isActive: i === page,
    };
    page_items.push(item);
  }
  res.render("vwproducts/list", {
    sanpham: list,
    empty: list.length === 0,
    page_items,
    prev_value: page - 1,
    next_value: page + 1,
  });
});

//detail
router.get("/detail/:MaSP", async function (req, res) {
  const id = req.params.MaSP;
  const listct = await productModel.detail_ct(id);
  const lists = await productModel.detail(id);
  const color = await productModel.detail_color(id);
  //hien thi san pham
  res.render("vwproducts/detail", {
    sanpham: lists,
    empty: lists.length === 0,
    sanphamct: listct,
    emptyct: listct.length === 0,
    color: color,
    emptycl: color.length === 0,
    
  });
});

//xuat san pham loai
router.get("/danhmuc0/:MaLoai", async function (req, res) {
  /* 
  const list = await productModel.allByCat(req.params.maLoai);
  //hien thi san pham
  res.render("vwproducts/byCat", {
    sanpham: list,
    empty: list.length === 0,
  }); */

  for (const c of res.locals.lcCategories) {
    if (c.MaLoai === +req.params.MaLoai) {
      c.isActive = true;
    }
  }
  //phan trang
  const page = +req.query.page || 1;

  if (page < 0) page = 1;
  const offset = (page - 1) * config.pagination.limit;
  const list = await productModel.pageByCat(
    req.params.MaLoai,
    config.pagination.limit,
    offset
  );

  const total = await productModel.countByLoai(req.params.MaLoai);
  const nPages = Math.ceil(total / config.pagination.limit);
  const page_items = [];
  for (let i = 1; i <= nPages; i++) {
    const item = {
      value: i,
      isActive: i === page,
    };
    page_items.push(item);
  }

  res.render("vwproducts/byCat", {
    sanpham: list,
    empty: list.length === 0,
    page_items,
    prev_value: page - 1,
    next_value: page + 1,
  });
});
//xuat san pham loai
router.get("/danhmuc1/:MaLoai", async function (req, res) {
  for (const c of res.locals.lcCategories1) {
    if (c.MaLoai === +req.params.MaLoai) {
      c.isActive = true;
    }
  }
  //phan trang
  const page = +req.query.page || 1;
  if (page < 0) page = 1;
  const offset = (page - 1) * config.pagination.limit;
  const list = await productModel.pageByCat(
    req.params.MaLoai,
    config.pagination.limit,
    offset
  );

  const total = await productModel.countByLoai(req.params.MaLoai);
  const nPages = Math.ceil(total / config.pagination.limit);
  const page_items = [];
  for (let i = 1; i <= nPages; i++) {
    const item = {
      value: i,
      isActive: i === page,
    };
    page_items.push(item);
  }

  res.render("vwproducts/byCat", {
    sanpham: list,
    empty: list.length === 0,
    page_items,
    prev_value: page - 1,
    next_value: page + 1,
  });
});
//xuat san pham loai
router.get("/danhmuc2/:MaLoai", async function (req, res) {
  for (const c of res.locals.lcCategories2) {
    if (c.MaLoai === +req.params.MaLoai) {
      c.isActive = true;
    }
  }
  //phan trang
  const page = +req.query.page || 1;

  if (page < 0) page = 1;
  const offset = (page - 1) * config.pagination.limit;
  const list = await productModel.pageByCat(
    req.params.MaLoai,
    config.pagination.limit,
    offset
  );

  const total = await productModel.countByLoai(req.params.MaLoai);
  const nPages = Math.ceil(total / config.pagination.limit);
  const page_items = [];
  for (let i = 1; i <= nPages; i++) {
    const item = {
      value: i,
      isActive: i === page,
    };
    page_items.push(item);
  }

  res.render("vwproducts/byCat", {
    sanpham: list,
    empty: list.length === 0,
    page_items,
    prev_value: page - 1,
    next_value: page + 1,
  });
});
/* router.get("/edit/:id", async function (req, res) {
  const id = +req.params.id || -1;
  const rows = await productModel.single(id);
  if (rows.length === 0) res.send("lõi la lõi");
  const product = rows[0];
  res.render("vwproducts/edit", { product });
});

router.post("/del", async function (req, res) {
  await productModel.del(req.body.proID);
  res.redirect("/admin/products");
});
router.post("/update", async function (req, res) {
  await productModel.patch(req.body);
  res.redirect("/admin/products");
}); */

module.exports = router;
