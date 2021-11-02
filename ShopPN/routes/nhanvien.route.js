const express = require("express");
const productModel = require("../models/product.model");
const nhanvienModel = require("../models/category.model");
const router = express.Router();

router.get("/", async function (req, res) {
  const list = await productModel.nv();
  res.render("vwproducts/nv", {
    nhanvien: list,
    empty: list.length === 0,
  });
});


//themn
router.get("/add", function (req, res) {
  res.render("vwproducts/add");
});
//them
router.post("/add", async function (req, res) {
  await nhanvienModel.add_nv(req.body);
  res.render("vwproducts/add");
});
//sua
router.get("/edit/:id", async function (req, res) {
  const id = +req.params.id || -1;
  const rows = await nhanvienModel.single_nv(id);
  if (rows.length === 0) res.send("lõi la lõi");
  const nv = rows[0];
  res.render("vwproducts/edit", { nv });
});
//xoa
router.post("/del", async function (req, res) {
  await nhanvienModel.del_nv(req.body.id);
  res.redirect("/admin/nhanvien");
});
//cap nhat
router.post("/update", async function (req, res) {
  await nhanvienModel.patch_nv(req.body);
  res.redirect("/admin/nhanvien");
});


module.exports = router;