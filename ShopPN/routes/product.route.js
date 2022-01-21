const express = require("express");
const productModel = require("../models/product.model");
const config = require("../config/default.json");
const Cart = require("../models/cart");
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
  const ggg = await productModel.detail_ggg();
  const data = ggg.filter(function (item) {
    return item.makm==id;
  });
  //console.log("data:",data)
  const lists = await productModel.detail(id);
  const color = await productModel.distinct_color(id);
  const size = await productModel.detail_size(id);
  const distinct_size = await productModel.distinct_size(id);
  const detail_anh = await productModel.detail_anh(id);
  var tong = 0;
  for (let i = 0; i < size.length; i++) {
      tong += size[i].soluong;
  }
  console.log("tong:",tong)
  
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
        items: cc,
      };
      console.log("itemi",itemi)
      page_items.push(itemi);
       // Thêm phần tử vào cuối mảng mới
    }
  }
  //console.log("page_items",page_items)
  res.render("vwproducts/detail", {
    //layout: false,
    detail_anh: detail_anh,
    sanpham: lists,
    giamgia:data,
    page_items,
    empty: lists.length === 0,
    sizes: distinct_size,
    tongkho: tong,
  });
});

//Get san pham loai
router.get("/do-be-gai/:MaLoai", async function (req, res) {
  const ten_loai = await productModel.tenloai(req.params.MaLoai);
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
    maloai:ten_loai,
    prev_value: page - 1,
    next_value: page + 1,
  });
});
//do-be-gai
router.get("/do-be-gai", async function (req, res) {
  //phan trang
  const page = +req.query.page || 1;
  if (page < 0) page = 1;
  const offset = (page - 1) * config.pagination.limit;
  const list = await productModel.pageByCat_gai(
    config.pagination.limit,
    offset
  );
  const total = await productModel.countByLoai_gai();
  var count = 0;
  for(var i = 0; i < total.length; i++){
      count ++;
  }
  const nPages = Math.ceil(count / config.pagination.limit);
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
    //maloai:"ten_loai",
    prev_value: page - 1,
    next_value: page + 1,
  });
});

//All get san pham loai do-be-gai
router.get("/category", async function (req, res) {
  const madm= req.query.category_id;
  const dm = await productModel.all_dm();
  //phan trang
  const page = +req.query.page || 1;
  if (page < 0) page = 1;
  const offset = (page - 1) * config.pagination.limit;
  const list = await productModel.pageloai0(
    madm,
    config.pagination.limit,
    offset
  );
  const total = await productModel.countByLoai0(madm);
  var count = 0;
  for(var i = 0; i < total.length; i++){
      count ++;
  }
  const nPages = Math.ceil(count / config.pagination.limit);
  const page_items = [];
  for (let i = 1; i <= nPages; i++) {
    const item = {
      value: i,
      cate_id:madm,
      isActive: i === page,
    };
    //console.log("text:",item)
    page_items.push(item);
  }
  if(madm==1){
    res.render("vwproducts/category1", {
      sanpham: list,
      empty: list.length === 0,
      page_items,
      prev_value: page - 1,
      next_value: page + 1,
    });
  }else{
    res.render("vwproducts/category", {
      sanpham: list,
      empty: list.length === 0,
      page_items,
      prev_value: page - 1,
      next_value: page + 1,
    });
  }
});

//Get san pham loai
router.get("/do-be-trai/:MaLoai", async function (req, res) {
  const ten_loai = await productModel.tenloai(req.params.MaLoai);
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
    maloai:ten_loai,
    prev_value: page - 1,
    next_value: page + 1,
  });
});
//Get tất cả bé trai
router.get("/do-be-trai", async function (req, res) {
  //phan trang
  const page = +req.query.page || 1;
  if (page < 0) page = 1;
  const offset = (page - 1) * config.pagination.limit;
  const list = await productModel.pageByCat_trai(
    config.pagination.limit,
    offset
  );
  const total = await productModel.countByLoai_trai();
  var count = 0;
  for(var i = 0; i < total.length; i++){
      count ++;
  }
  const nPages = Math.ceil(count / config.pagination.limit);
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
    //maloai:"ten_loai",
    prev_value: page - 1,
    next_value: page + 1,
  });
});
//xuat san pham loai
router.get("/phu-kien/:MaLoai", async function (req, res) {
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
