const express = require("express");
const productModel = require("../models/product.model");
const config = require("../config/default.json");
const router = express.Router();

router.get("/", async function (req, res) {
  /* 
  const list = await productModel.allByCat(req.params.maLoai);
  //hien thi san pham
  res.render("vwproducts/byCat", {
    sanpham: list,
    empty: list.length === 0,
  }); */

  // const list = await productModel.allByCat(req.params.catId);
  //phan trang
  const page = +req.query.page || 1;
  if (page < 0) page = 1;
  const offset = (page - 1) * config.pagination.limit;
  const list = await productModel.newProduct(
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
  res.render("home", {
    sanpham: list,
    empty: list.length === 0,
    page_items,
    prev_value: page - 1,
    next_value: page + 1,
  });
});

/* router.get("/", async function (req, res) {
  for (const c of res.locals.lcCategories) {
    if (c.MaLoai === +req.params.MaLoai) {
      c.isActive = true;
    }
  }
  // const list = await productModel.allByCat(req.params.catId);
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
  res.render("home", {
    sanpham: list,
    empty: list.length === 0,
    page_items,
    prev_value: page - 1,
    next_value: page + 1,
  });
}); */

//tim kiem
router.get("/search", async function (req, res) {
  const product = await productModel.all();
  const TenSP = req.query.TenSP;
  const data = product.filter(function (item) {
    let a 
    if(a = TenSP.toLowerCase()){}
    return item.TenSP.indexOf(a) > -1;
  });

  res.render("home", {
    products: data,
    empty: data.length === 0,
  });
});


module.exports = router;
