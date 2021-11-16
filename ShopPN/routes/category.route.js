const express = require("express");
const categoryModel = require("../models/category.model");

const router = express.Router();

//list loại
router.get("/", async function (req, res) {
  /* const list = [
      { CatID: 1, CatName: "LapTop" },
      { CatID: 2, CatName: "LapTops" },
      { CatID: 3, CatName: "LapTopss" },
    ];*/

  const list = await categoryModel.all();
  res.render("vwcategories/list", {
    categories: list,
    empty: list.length === 0,
  });
});
//themn
router.get("/add", function (req, res) {
  res.render("vwcategories/add");
});
//them
router.post("/add", async function (req, res) {
  await categoryModel.add(req.body);
  res.render("vwcategories/add");
});
//sua
router.get("/edit/:id", async function (req, res) {
  const id = +req.params.id || -1;
  const rows = await categoryModel.single(id);
  if (rows.length === 0) res.send("lõi la lõi");
  const category = rows[0];
  res.render("vwcategories/edit", { category });
});
//xoa
router.post("/del", async function (req, res) {
  await categoryModel.del(req.body.CatID);
  res.redirect("/admin/categories");
});
//cap nhat
router.post("/update", async function (req, res) {
  await categoryModel.patch(req.body);
  res.redirect("/admin/categories");
});

module.exports = router;
