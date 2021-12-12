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
  const product = await productModel.detail_ct(id);
  const lists = await productModel.detail(id);
  const color = await productModel.distinct_color(id);
  const size = await productModel.detail_size(id);
  const distinct_size = await productModel.distinct_size(id);
  const detail_anh = await productModel.detail_anh(id);

  let page_items = [];
  for (let i = 0; i < color.length; i++) {
    if (color[i].color_id >= 0) {
      const cc = [];
      for (let j = 0; j < size.length; j++) {
        if (color[i].color_id == size[j].color_id) {
          cc.push(size[j]);
        }
      }
      const itemi = {
        code: color[i],
        /* isActive: color[i].color_id===cc.color_id, */
        items: cc,
      };
      console.log("itemi",itemi)
      page_items.push(itemi); // Thêm phần tử vào cuối mảng mới
    }
  }
  console.log("iiiiiidetail2222", page_items);
  res.render("vwproducts/detail", {
    layout: false,
    detail_anh: detail_anh,
    sanpham: lists,
    page_items,
    empty: lists.length === 0,
    sizes: distinct_size,
  });
});

//xuat san pham loai
router.get("/danhmuc0/:MaLoai", async function (req, res) {
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

module.exports = router;
