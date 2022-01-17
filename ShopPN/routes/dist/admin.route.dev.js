"use strict";

var express = require("express");

var db = require("../utils/db");

var moment = require("moment");

var bcrypt = require("bcryptjs");

var Model = require("../models/admin_user.model");

var config = require("../config/default.json");

var multer = require("multer"); //register
//const {validationResult} = require('express-validator');


var _require = require("../middlewares/validate.mdw"),
    registerValidator = _require.registerValidator; //login//logout


var restrict = require("../middlewares/auth.mdw");

var router = express.Router(); //login

router.get("/", function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.render("vwadmin/login"
          /* , { layout: false } */
          ); //tat layout trang chu

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post("/", function _callee2(req, res) {
  var user, rs, url;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Model.singleUserName(req.body.username));

        case 2:
          user = _context2.sent;

          if (!(user === null)) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", res.render("vwadmin/login", {
            err: "Sai tên hoặc mật khẩu."
          }));

        case 5:
          rs = bcrypt.compareSync(req.body.password, user.password);

          if (!(rs === false)) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", res.render("vwadmin/login", {
            err: "Sai tên hoặc mật khẩu."
          }));

        case 8:
          delete user.password;
          req.session.isAuthenticated = true;
          req.session.authUser = user;
          url = req.query.retUrl || "/admin/home";
          res.redirect(url);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //logout

router.post("/logoutadmin", restrict.admin_nhanvien, function (req, res) {
  req.session.isAuthenticated = false;
  req.session.authUser = null;
  res.redirect("/admin");
}); //
//
//home admin

router.get("/home", restrict.admin_nhanvien, function _callee3(req, res) {
  var user, kho, daban, donmoi, total_kho, i, total_ban, _i, total_donmoi, _i2, array;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Model.total_user());

        case 2:
          user = _context3.sent;
          _context3.next = 5;
          return regeneratorRuntime.awrap(Model.total_kho());

        case 5:
          kho = _context3.sent;
          _context3.next = 8;
          return regeneratorRuntime.awrap(Model.total_hoadon());

        case 8:
          daban = _context3.sent;
          _context3.next = 11;
          return regeneratorRuntime.awrap(Model.total_donmoi());

        case 11:
          donmoi = _context3.sent;
          total_kho = 0;

          for (i = 0; i < kho.length; i++) {
            total_kho += kho[i].soluong;
          }

          total_ban = 0;

          for (_i = 0; _i < daban.length; _i++) {
            total_ban += daban[_i].soluong;
          }

          total_donmoi = 0;

          for (_i2 = 0; _i2 < donmoi.length; _i2++) {
            total_donmoi++;
          }

          array = {
            total_user: user,
            total_kho: total_kho,
            total_ban: total_ban,
            total_donmoi: total_donmoi
          };
          res.render("_layouts/admin", {
            layout: false,
            array: array
          }); //tat layout trang chu

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  });
}); ////////////////products////////////////
//attribute_list san pham thuoc tinh

router.get("/attribute/list", restrict.admin, function _callee4(req, res) {
  var list, colors, sizes, arrlist, i, cls, j, sizesl, k, sl, sp;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Model.attr_products());

        case 2:
          list = _context4.sent;
          _context4.next = 5;
          return regeneratorRuntime.awrap(Model.distinct_colors());

        case 5:
          colors = _context4.sent;
          _context4.next = 8;
          return regeneratorRuntime.awrap(Model.distinct_sizes());

        case 8:
          sizes = _context4.sent;
          arrlist = [];

          for (i = 0; i < list.length; i++) {
            cls = []; //đỏ, xanh

            for (j = 0; j < colors.length; j++) {
              if (list[i].MaSP == colors[j].masp) {
                //nếu 2 màu
                sizesl = []; //nhiều size

                for (k = 0; k < sizes.length; k++) {
                  if (sizes[k].color_id == colors[j].color_id && sizes[k].masp == colors[j].masp) {
                    sizesl.push(sizes[k]);
                  }
                }

                sl = {
                  code: colors[j],
                  items: sizesl //1mau

                };
                console.log("sl", sl);
                cls.push(sl);
              }
            }

            sp = {
              MaSP: list[i].MaSP,
              TenSP: list[i].TenSP,
              Anh: list[i].Anh,
              SoLuongBan: list[i].SoLuongBan,
              Gia: list[i].Gia,
              MoTa: list[i].MoTa,
              chatlieu: list[i].chatlieu,
              TinhTrang: list[i].TinhTrang,
              NgayNhap: list[i].NgayNhap,
              thuoctinh: cls //thuoctinh:đỏ[size,soluong] color, size, soluong

            };
            console.log("spmoi", sp);
            arrlist.push(sp); // Thêm phần tử vào cuối mảng mới
          }

          console.log("arrlist", arrlist);
          res.render("vwadmin/products/attribute_list", {
            layout: "admin",
            sanpham: list,
            arrlist: arrlist,
            empty: list.length === 0
          });

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //attribute_add

router.get("/attribute/add", restrict.admin, function _callee5(req, res) {
  var sanp, attr_colors, attr_sizes, list, colors, sizes, arrlist, i, cls, j, sizesl, k, sl, sp;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Model._products());

        case 2:
          sanp = _context5.sent;
          _context5.next = 5;
          return regeneratorRuntime.awrap(Model.attr_colors());

        case 5:
          attr_colors = _context5.sent;
          _context5.next = 8;
          return regeneratorRuntime.awrap(Model.attr_sizes());

        case 8:
          attr_sizes = _context5.sent;
          _context5.next = 11;
          return regeneratorRuntime.awrap(Model.attr_products());

        case 11:
          list = _context5.sent;
          _context5.next = 14;
          return regeneratorRuntime.awrap(Model.distinct_colors());

        case 14:
          colors = _context5.sent;
          _context5.next = 17;
          return regeneratorRuntime.awrap(Model.distinct_sizes());

        case 17:
          sizes = _context5.sent;
          arrlist = [];

          for (i = 0; i < list.length; i++) {
            cls = []; //đỏ, xanh

            for (j = 0; j < colors.length; j++) {
              if (list[i].MaSP == colors[j].masp) {
                //nếu 2 màu
                sizesl = []; //nhiều size

                for (k = 0; k < sizes.length; k++) {
                  if (sizes[k].color_id == colors[j].color_id && sizes[k].masp == colors[j].masp) {
                    sizesl.push(sizes[k]);
                  }
                }

                sl = {
                  code: colors[j],
                  items: sizesl //1mau

                };
                cls.push(sl);
              }
            }

            sp = {
              MaSP: list[i].MaSP,
              TenSP: list[i].TenSP,
              SoLuong: list[i].SoLuong,
              //Gia:list[i].Gia,
              thuoctinh: cls //thuoctinh:đỏ[size,soluong] color, size, soluong

            };
            arrlist.push(sp); // Thêm phần tử vào cuối mảng mới
          }

          res.render("vwadmin/products/attribute_add", {
            layout: "admin",
            sanpham: sanp,
            arrlist: arrlist,
            colors: attr_colors,
            sizes: attr_sizes,
            empty: list.length === 0
          });

        case 21:
        case "end":
          return _context5.stop();
      }
    }
  });
});
router.post("/attribute/add", restrict.admin, function _callee6(req, res) {
  var size_ids, sl, entity, i, j, masp, color_id, size_id, soluong, arr;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          size_ids = req.body.size_id;
          sl = req.body.soluong;
          entity = [];

          for (i = 0; i < size_ids.length; i++) {
            for (j = 0; j < sl.length; j++) {
              if (i == j) {
                masp = req.body.MaSP;
                color_id = req.body.color_id;
                size_id = size_ids[i];
                soluong = sl[j];
                arr = [masp, color_id, size_id, soluong];
                entity.push(arr);
              }
            }
          }

          console.log("attribute:", entity);
          _context6.next = 7;
          return regeneratorRuntime.awrap(db.insert_attr(entity));

        case 7:
          res.redirect("/admin/attribute/add");

        case 8:
        case "end":
          return _context6.stop();
      }
    }
  });
}); //xóa attribute sanpham co thuoc tinh

router.get("/attribute/remove/:id", function _callee7(req, res) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(Model.remove_attr(req.params.id));

        case 2:
          res.redirect("/admin/attribute/list");

        case 3:
        case "end":
          return _context7.stop();
      }
    }
  });
}); //list thuộc tính attribute detail

router.get("/attribute/detail/:id", restrict.admin, function _callee8(req, res) {
  var id, rows_attr;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          id = +req.params.id || -1;
          _context8.next = 3;
          return regeneratorRuntime.awrap(Model.single_attr_ct(id));

        case 3:
          rows_attr = _context8.sent;
          res.render("vwadmin/products/attr", {
            layout: "admin",
            sanpham: rows_attr,
            empty: rows_attr.length === 0
          });

        case 5:
        case "end":
          return _context8.stop();
      }
    }
  });
}); //xóa attribute detail

router.get("/attr/remove/:id", function _callee9(req, res) {
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(Model.remove_attr_detail(req.params.id));

        case 2:
          res.redirect("/admin/attribute/list");

        case 3:
        case "end":
          return _context9.stop();
      }
    }
  });
}); //sua attribute detail

router.get("/attr/edit/:id", restrict.admin, function _callee10(req, res) {
  var id, rows, sizes, product;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          id = +req.params.id || -1;
          _context10.next = 3;
          return regeneratorRuntime.awrap(Model.single_attr_detail(id));

        case 3:
          rows = _context10.sent;
          _context10.next = 6;
          return regeneratorRuntime.awrap(Model.sizes_list());

        case 6:
          sizes = _context10.sent;
          if (rows.length === 0) res.send("lõi la lõi");
          product = rows[0];
          return _context10.abrupt("return", res.render("vwadmin/products/attr_edit", {
            layout: "admin",
            product: product,
            sizes: sizes
          }));

        case 10:
        case "end":
          return _context10.stop();
      }
    }
  });
}); //cap nhat attribute detail

router.post("/attr/update", restrict.admin, function _callee11(req, res) {
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap(Model.patch_attr_detail(req.body));

        case 2:
          res.redirect("/admin/attribute/list");

        case 3:
        case "end":
          return _context11.stop();
      }
    }
  });
}); //list san pham

router.get("/products/list", restrict.admin, function _callee12(req, res) {
  var list;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return regeneratorRuntime.awrap(Model._products());

        case 2:
          list = _context12.sent;
          res.render("vwadmin/products/list", {
            layout: "admin",
            sanpham: list,
            empty: list.length === 0
          });

        case 4:
        case "end":
          return _context12.stop();
      }
    }
  });
}); //them upload_sp.route.js
//xóa sanpham và anhct

router.get("/products/remove/:id", function _callee13(req, res) {
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return regeneratorRuntime.awrap(Model.remove_anhct(req.params.id));

        case 2:
          _context13.next = 4;
          return regeneratorRuntime.awrap(Model.remove_pro(req.params.id));

        case 4:
          res.redirect("/admin/products/list");

        case 5:
        case "end":
          return _context13.stop();
      }
    }
  });
}); //sua

router.get("/products/edit/:id", restrict.admin, function _callee14(req, res) {
  var id, rows, product;
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          id = +req.params.id || -1;
          _context14.next = 3;
          return regeneratorRuntime.awrap(Model.single_pro(id));

        case 3:
          rows = _context14.sent;
          if (rows.length === 0) res.send("lõi la lõi");
          product = rows[0];

          if (req.files) {
            _context14.next = 8;
            break;
          }

          return _context14.abrupt("return", res.render("vwadmin/products/edit", {
            layout: "admin",
            product: product
          }));

        case 8:
        case "end":
          return _context14.stop();
      }
    }
  });
}); //cap nhat

router.post("/products/update", restrict.admin, function _callee15(req, res) {
  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return regeneratorRuntime.awrap(Model.patch_pro(req.body));

        case 2:
          res.redirect("/admin/products/list");

        case 3:
        case "end":
          return _context15.stop();
      }
    }
  });
}); ////////////////category////////////////
//list

router.get("/category/list", restrict.admin, function _callee16(req, res) {
  var list;
  return regeneratorRuntime.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return regeneratorRuntime.awrap(Model.all_category());

        case 2:
          list = _context16.sent;
          res.render("vwadmin/categories/list", {
            layout: "admin",
            loaisp: list,
            empty: list.length === 0
          });

        case 4:
        case "end":
          return _context16.stop();
      }
    }
  });
}); //themn

router.get("/category/add", restrict.admin, function _callee17(req, res) {
  var list;
  return regeneratorRuntime.async(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return regeneratorRuntime.awrap(Model.all_dm());

        case 2:
          list = _context17.sent;
          res.render("vwadmin/categories/add", {
            layout: "admin",
            sanpham: list
          });

        case 4:
        case "end":
          return _context17.stop();
      }
    }
  });
}); //them

router.post("/category/add", restrict.admin, function _callee18(req, res) {
  return regeneratorRuntime.async(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.next = 2;
          return regeneratorRuntime.awrap(Model.add_loai(req.body));

        case 2:
          res.redirect("/admin/category/add");

        case 3:
        case "end":
          return _context18.stop();
      }
    }
  });
}); //xoa

router.get("/category/remove/:id", restrict.admin, function _callee19(req, res) {
  var id, distinct, list, i;
  return regeneratorRuntime.async(function _callee19$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          id = req.params.id;
          _context19.next = 3;
          return regeneratorRuntime.awrap(Model.distinct_category());

        case 3:
          distinct = _context19.sent;
          _context19.next = 6;
          return regeneratorRuntime.awrap(Model.all_category());

        case 6:
          list = _context19.sent;
          i = 0;

        case 8:
          if (!(i < distinct.length)) {
            _context19.next = 14;
            break;
          }

          if (!(distinct[i].MaLoai == id)) {
            _context19.next = 11;
            break;
          }

          return _context19.abrupt("return", res.render("vwadmin/categories/list", {
            err: "Vì sự ràng buộc dữ liệu.",
            layout: "admin",
            loaisp: list,
            empty: list.length === 0
          }));

        case 11:
          i++;
          _context19.next = 8;
          break;

        case 14:
          _context19.next = 16;
          return regeneratorRuntime.awrap(Model.remove_loai(id));

        case 16:
          res.redirect("/admin/category/list");

        case 17:
        case "end":
          return _context19.stop();
      }
    }
  });
}); //sua

router.get("/category/edit/:id", restrict.admin, function _callee20(req, res) {
  var id, rows, loai;
  return regeneratorRuntime.async(function _callee20$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          id = req.params.id;
          _context20.next = 3;
          return regeneratorRuntime.awrap(Model.single_loai(id));

        case 3:
          rows = _context20.sent;
          loai = rows[0];
          res.render("vwadmin/categories/edit", {
            loai: loai,
            layout: "admin"
          });

        case 6:
        case "end":
          return _context20.stop();
      }
    }
  });
}); //cap nhat

router.post("/category/update", restrict.admin, function _callee21(req, res) {
  return regeneratorRuntime.async(function _callee21$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          _context21.next = 2;
          return regeneratorRuntime.awrap(Model.update_loai(req.body));

        case 2:
          res.redirect("/admin/category/list");

        case 3:
        case "end":
          return _context21.stop();
      }
    }
  });
}); ////////////////khách hàng////////////////
//list kh

router.get("/kh", restrict.admin_nhanvien, function _callee22(req, res) {
  var list;
  return regeneratorRuntime.async(function _callee22$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          _context22.next = 2;
          return regeneratorRuntime.awrap(Model.all_kh());

        case 2:
          list = _context22.sent;
          res.render("vwadmin/order/kh", {
            layout: "admin",
            khachhang: list,
            empty: list.length === 0
          });

        case 4:
        case "end":
          return _context22.stop();
      }
    }
  });
}); //hoadon theo makh

router.get("/kh/hoadon/:makh", restrict.admin_nhanvien, function _callee23(req, res) {
  var list;
  return regeneratorRuntime.async(function _callee23$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          _context23.next = 2;
          return regeneratorRuntime.awrap(Model.all_hoadonkh(req.params.makh));

        case 2:
          list = _context23.sent;
          res.render("vwadmin/order/hoadon", {
            layout: "admin",
            hoadon: list,
            empty: list.length === 0
          });

        case 4:
        case "end":
          return _context23.stop();
      }
    }
  });
}); //hoadon

router.get("/hoadon", restrict.admin_nhanvien, function _callee24(req, res) {
  var list;
  return regeneratorRuntime.async(function _callee24$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          _context24.next = 2;
          return regeneratorRuntime.awrap(Model.all_hoadon());

        case 2:
          list = _context24.sent;
          res.render("vwadmin/order/hoadon", {
            layout: "admin",
            hoadon: list,
            empty: list.length === 0
          });

        case 4:
        case "end":
          return _context24.stop();
      }
    }
  });
}); //hoadon chi tiet

router.get("/hoadonct/:mahd", restrict.admin_nhanvien, function _callee25(req, res) {
  var mahd, list;
  return regeneratorRuntime.async(function _callee25$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          mahd = req.params.mahd;
          console.log("mahdd:", mahd);
          _context25.next = 4;
          return regeneratorRuntime.awrap(Model.all_hoadonct(mahd));

        case 4:
          list = _context25.sent;
          console.log("dsct:", list);
          res.render("vwadmin/order/hoadonct", {
            layout: "admin",
            hoadonct: list,
            empty: list.length === 0
          });

        case 7:
        case "end":
          return _context25.stop();
      }
    }
  });
}); /////START XỬ LÝ TRẠNG THÁI HÓA ĐƠN////
//sua hoadon

router.get("/hoadon/edit/:id", restrict.admin_nhanvien, function _callee26(req, res) {
  var id, rows, hoadon;
  return regeneratorRuntime.async(function _callee26$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          id = req.params.id;
          _context26.next = 3;
          return regeneratorRuntime.awrap(Model.single_hd(id));

        case 3:
          rows = _context26.sent;
          hoadon = rows[0];
          res.render("vwadmin/order/edit", {
            hoadon: hoadon,
            layout: "admin"
          });

        case 6:
        case "end":
          return _context26.stop();
      }
    }
  });
}); //cap nhat hoadon

router.post("/hoadon/update", restrict.admin_nhanvien, function _callee27(req, res) {
  return regeneratorRuntime.async(function _callee27$(_context27) {
    while (1) {
      switch (_context27.prev = _context27.next) {
        case 0:
          _context27.next = 2;
          return regeneratorRuntime.awrap(Model.update_hd(req.body));

        case 2:
          res.redirect("/admin/hoadon/choxacnhan");

        case 3:
        case "end":
          return _context27.stop();
      }
    }
  });
}); //hoadon cho_xac_nhan

router.get("/hoadon/choxacnhan", restrict.admin_nhanvien, function _callee28(req, res) {
  var list;
  return regeneratorRuntime.async(function _callee28$(_context28) {
    while (1) {
      switch (_context28.prev = _context28.next) {
        case 0:
          _context28.next = 2;
          return regeneratorRuntime.awrap(Model.single_choxacnhan());

        case 2:
          list = _context28.sent;
          res.render("vwadmin/order/choxacnhan", {
            layout: "admin",
            hoadon: list,
            empty: list.length === 0
          });

        case 4:
        case "end":
          return _context28.stop();
      }
    }
  });
}); //cap nhat hoadon cho_xac_nhan

router.get("/hoadon/choxacnhan/:mahd", restrict.admin_nhanvien, function _callee29(req, res) {
  var mahd, entity;
  return regeneratorRuntime.async(function _callee29$(_context29) {
    while (1) {
      switch (_context29.prev = _context29.next) {
        case 0:
          mahd = req.params.mahd;
          entity = {
            mahd: mahd,
            trangthai: "Đã xác nhận"
          };
          console.log("entity", entity);
          _context29.next = 5;
          return regeneratorRuntime.awrap(Model.update_hd(entity));

        case 5:
          res.redirect("/admin/hoadon/choxacnhan");

        case 6:
        case "end":
          return _context29.stop();
      }
    }
  });
}); //
//hoadon da_xac_nhan

router.get("/hoadon/daxacnhan", restrict.admin_nhanvien, function _callee30(req, res) {
  var list;
  return regeneratorRuntime.async(function _callee30$(_context30) {
    while (1) {
      switch (_context30.prev = _context30.next) {
        case 0:
          _context30.next = 2;
          return regeneratorRuntime.awrap(Model.single_daxacnhan());

        case 2:
          list = _context30.sent;
          res.render("vwadmin/order/daxacnhan", {
            layout: "admin",
            hoadon: list,
            empty: list.length === 0
          });

        case 4:
        case "end":
          return _context30.stop();
      }
    }
  });
}); //cap nhat hoadon  da_xac_nhan

router.get("/hoadon/daxacnhan/:mahd", restrict.admin_nhanvien, function _callee31(req, res) {
  var mahd, entity;
  return regeneratorRuntime.async(function _callee31$(_context31) {
    while (1) {
      switch (_context31.prev = _context31.next) {
        case 0:
          mahd = req.params.mahd;
          entity = {
            mahd: mahd,
            trangthai: "Đang giao"
          };
          console.log("entity", entity);
          _context31.next = 5;
          return regeneratorRuntime.awrap(Model.update_hd(entity));

        case 5:
          res.redirect("/admin/hoadon/daxacnhan");

        case 6:
        case "end":
          return _context31.stop();
      }
    }
  });
}); //
//hoadon dang_giao

router.get("/hoadon/danggiao", restrict.admin_nhanvien, function _callee32(req, res) {
  var list;
  return regeneratorRuntime.async(function _callee32$(_context32) {
    while (1) {
      switch (_context32.prev = _context32.next) {
        case 0:
          _context32.next = 2;
          return regeneratorRuntime.awrap(Model.single_danggiao());

        case 2:
          list = _context32.sent;
          res.render("vwadmin/order/danggiao", {
            layout: "admin",
            hoadon: list,
            empty: list.length === 0
          });

        case 4:
        case "end":
          return _context32.stop();
      }
    }
  });
}); //cap nhat hoadon  dang_giao

router.get("/hoadon/danggiao/:mahd", restrict.admin_nhanvien, function _callee33(req, res) {
  var mahd, entity;
  return regeneratorRuntime.async(function _callee33$(_context33) {
    while (1) {
      switch (_context33.prev = _context33.next) {
        case 0:
          mahd = req.params.mahd;
          entity = {
            mahd: mahd,
            trangthai: "Đã nhận hàng"
          };
          console.log("entity", entity);
          _context33.next = 5;
          return regeneratorRuntime.awrap(Model.update_hd(entity));

        case 5:
          res.redirect("/admin/hoadon/danggiao");

        case 6:
        case "end":
          return _context33.stop();
      }
    }
  });
}); //
//hoadon da_nhan_hang

router.get("/hoadon/danhan", restrict.admin_nhanvien, function _callee34(req, res) {
  var list;
  return regeneratorRuntime.async(function _callee34$(_context34) {
    while (1) {
      switch (_context34.prev = _context34.next) {
        case 0:
          _context34.next = 2;
          return regeneratorRuntime.awrap(Model.single_danhan());

        case 2:
          list = _context34.sent;
          res.render("vwadmin/order/danhan", {
            layout: "admin",
            hoadon: list,
            empty: list.length === 0
          });

        case 4:
        case "end":
          return _context34.stop();
      }
    }
  });
}); //
//hoadon da_huy

router.get("/hoadon/dahuy", restrict.admin_nhanvien, function _callee35(req, res) {
  var list;
  return regeneratorRuntime.async(function _callee35$(_context35) {
    while (1) {
      switch (_context35.prev = _context35.next) {
        case 0:
          _context35.next = 2;
          return regeneratorRuntime.awrap(Model.single_dahuy());

        case 2:
          list = _context35.sent;
          res.render("vwadmin/order/dahuy", {
            layout: "admin",
            hoadon: list,
            empty: list.length === 0
          });

        case 4:
        case "end":
          return _context35.stop();
      }
    }
  });
}); //cap nhat hoadon  da_huy

router.get("/hoadon/dahuy/:mahd", restrict.admin_nhanvien, function _callee36(req, res) {
  var mahd, entity, hd, spct, i, j, _entity;

  return regeneratorRuntime.async(function _callee36$(_context36) {
    while (1) {
      switch (_context36.prev = _context36.next) {
        case 0:
          mahd = req.params.mahd;
          entity = {
            mahd: mahd,
            trangthai: "Đã hủy"
          };
          _context36.next = 4;
          return regeneratorRuntime.awrap(Model.update_hd(entity));

        case 4:
          _context36.next = 6;
          return regeneratorRuntime.awrap(Model.hd_id(mahd));

        case 6:
          hd = _context36.sent;
          _context36.next = 9;
          return regeneratorRuntime.awrap(Model.all_spct());

        case 9:
          spct = _context36.sent;
          i = 0;

        case 11:
          if (!(i < hd.length)) {
            _context36.next = 24;
            break;
          }

          j = 0;

        case 13:
          if (!(j < spct.length)) {
            _context36.next = 21;
            break;
          }

          if (!(hd[i].ma_id == spct[j].sp_id)) {
            _context36.next = 18;
            break;
          }

          _entity = {
            sp_id: hd[i].ma_id,
            soluong: spct[j].soluong + hd[i].quantity
          };
          _context36.next = 18;
          return regeneratorRuntime.awrap(Model.update_spct(_entity));

        case 18:
          j++;
          _context36.next = 13;
          break;

        case 21:
          i++;
          _context36.next = 11;
          break;

        case 24:
          res.redirect("/admin/hoadon/dahuy");

        case 25:
        case "end":
          return _context36.stop();
      }
    }
  });
}); /////END XỬ LÝ TRẠNG THÁI HÓA ĐƠN////
////////////////End khách hàng////////////////
////////////////Start nhan vien ////////////////
//list nhan vien

router.get("/user", restrict.admin, function _callee37(req, res) {
  var list;
  return regeneratorRuntime.async(function _callee37$(_context37) {
    while (1) {
      switch (_context37.prev = _context37.next) {
        case 0:
          _context37.next = 2;
          return regeneratorRuntime.awrap(Model.all_nv());

        case 2:
          list = _context37.sent;
          res.render("vwadmin/quantri/quantri", {
            layout: "admin",
            quantri: list,
            empty: list.length === 0
          });

        case 4:
        case "end":
          return _context37.stop();
      }
    }
  });
}); //themn

router.get("/user/add", restrict.admin, function _callee38(req, res) {
  var list;
  return regeneratorRuntime.async(function _callee38$(_context38) {
    while (1) {
      switch (_context38.prev = _context38.next) {
        case 0:
          _context38.next = 2;
          return regeneratorRuntime.awrap(Model.all_nv());

        case 2:
          list = _context38.sent;
          res.render("vwadmin/quantri/add", {
            layout: "admin",
            sanpham: list
          });

        case 4:
        case "end":
          return _context38.stop();
      }
    }
  });
}); //them

router.post("/user/add", restrict.admin, function _callee39(req, res) {
  var salt, password_hash, entity;
  return regeneratorRuntime.async(function _callee39$(_context39) {
    while (1) {
      switch (_context39.prev = _context39.next) {
        case 0:
          salt = bcrypt.genSaltSync(10);
          password_hash = bcrypt.hashSync(req.body.password, salt);
          entity = {
            tennv: req.body.tennv,
            gioitinh: req.body.gioitinh,
            ngaysinh: req.body.ngaysinh,
            email: req.body.email,
            sdt: req.body.sdt,
            username: req.body.username,
            password: password_hash,
            quyen: req.body.quyen
          };
          _context39.next = 5;
          return regeneratorRuntime.awrap(Model.add_nv(entity));

        case 5:
          res.redirect("/admin/user/add");

        case 6:
        case "end":
          return _context39.stop();
      }
    }
  });
}); //xoa

router.get("/user/remove/:id", restrict.admin, function _callee40(req, res) {
  return regeneratorRuntime.async(function _callee40$(_context40) {
    while (1) {
      switch (_context40.prev = _context40.next) {
        case 0:
          _context40.next = 2;
          return regeneratorRuntime.awrap(Model.remove_nv(req.params.id));

        case 2:
          res.redirect("/admin/user");

        case 3:
        case "end":
          return _context40.stop();
      }
    }
  });
}); //sua

router.get("/user/edit/:id", restrict.admin, function _callee41(req, res) {
  var id, rows, qt;
  return regeneratorRuntime.async(function _callee41$(_context41) {
    while (1) {
      switch (_context41.prev = _context41.next) {
        case 0:
          id = req.params.id;
          _context41.next = 3;
          return regeneratorRuntime.awrap(Model.single_nv(id));

        case 3:
          rows = _context41.sent;
          qt = rows[0];
          res.render("vwadmin/quantri/edit", {
            quantri: qt,
            layout: "admin"
          });

        case 6:
        case "end":
          return _context41.stop();
      }
    }
  });
}); //cap nhat

router.post("/user/update", restrict.admin, function _callee42(req, res) {
  var _entity2, salt, password_hash, entity;

  return regeneratorRuntime.async(function _callee42$(_context42) {
    while (1) {
      switch (_context42.prev = _context42.next) {
        case 0:
          if (!(req.body.password === null)) {
            _context42.next = 6;
            break;
          }

          _entity2 = {
            manv: req.body.manv,
            tennv: req.body.tennv,
            gioitinh: req.body.gioitinh,
            ngaysinh: req.body.ngaysinh,
            email: req.body.email,
            sdt: req.body.sdt,
            username: req.body.username,
            quyen: req.body.quyen
          };
          console.log("body", req.body);
          _context42.next = 5;
          return regeneratorRuntime.awrap(Model.update_nv(_entity2));

        case 5:
          res.redirect("/admin/user");

        case 6:
          salt = bcrypt.genSaltSync(10);
          password_hash = bcrypt.hashSync(req.body.password, salt);
          entity = {
            manv: req.body.manv,
            tennv: req.body.tennv,
            gioitinh: req.body.gioitinh,
            ngaysinh: req.body.ngaysinh,
            email: req.body.email,
            sdt: req.body.sdt,
            username: req.body.username,
            password: password_hash,
            quyen: req.body.quyen
          };
          console.log("body", req.body);
          _context42.next = 12;
          return regeneratorRuntime.awrap(Model.update_nv(entity));

        case 12:
          res.redirect("/admin/user");

        case 13:
        case "end":
          return _context42.stop();
      }
    }
  });
}); ////////////////Giảm Giá////////////////
//list giảm giá

router.get("/giamgia", restrict.admin, function _callee43(req, res) {
  var list;
  return regeneratorRuntime.async(function _callee43$(_context43) {
    while (1) {
      switch (_context43.prev = _context43.next) {
        case 0:
          _context43.next = 2;
          return regeneratorRuntime.awrap(Model.all_gg());

        case 2:
          list = _context43.sent;
          res.render("vwadmin/giamgia/giamgia", {
            layout: "admin",
            giamgia: list,
            empty: list.length === 0
          });

        case 4:
        case "end":
          return _context43.stop();
      }
    }
  });
}); //themn

router.get("/giamgia/add", restrict.admin, function _callee44(req, res) {
  var list;
  return regeneratorRuntime.async(function _callee44$(_context44) {
    while (1) {
      switch (_context44.prev = _context44.next) {
        case 0:
          _context44.next = 2;
          return regeneratorRuntime.awrap(Model.all_sp_gg());

        case 2:
          list = _context44.sent;
          res.render("vwadmin/giamgia/add", {
            layout: "admin",
            sanpham: list
          });

        case 4:
        case "end":
          return _context44.stop();
      }
    }
  });
}); //them

router.post("/giamgia/add", restrict.admin, function _callee45(req, res) {
  var id, giakm, list, rows, giagoc;
  return regeneratorRuntime.async(function _callee45$(_context45) {
    while (1) {
      switch (_context45.prev = _context45.next) {
        case 0:
          id = req.body.makm;
          giakm = req.body.giakm;
          _context45.next = 4;
          return regeneratorRuntime.awrap(Model.all_sp_gg());

        case 4:
          list = _context45.sent;
          _context45.next = 7;
          return regeneratorRuntime.awrap(Model.id_sp_gg(id));

        case 7:
          rows = _context45.sent;
          giagoc = rows[0].Gia;

          if (!(giakm > giagoc)) {
            _context45.next = 11;
            break;
          }

          return _context45.abrupt("return", res.render("vwadmin/giamgia/add", {
            err: "Giá khuyến mãi phải nhỏ hơn giá gốc.",
            layout: "admin",
            sanpham: list
          }));

        case 11:
          _context45.next = 13;
          return regeneratorRuntime.awrap(Model.add_gg(req.body));

        case 13:
          res.redirect("/admin/giamgia/add");

        case 14:
        case "end":
          return _context45.stop();
      }
    }
  });
}); //xoa

router.get("/giamgia/remove/:id", restrict.admin, function _callee46(req, res) {
  return regeneratorRuntime.async(function _callee46$(_context46) {
    while (1) {
      switch (_context46.prev = _context46.next) {
        case 0:
          _context46.next = 2;
          return regeneratorRuntime.awrap(Model.remove_gg(req.params.id));

        case 2:
          res.redirect("/admin/giamgia");

        case 3:
        case "end":
          return _context46.stop();
      }
    }
  });
}); //sua

router.get("/giamgia/edit/:id", restrict.admin, function _callee47(req, res) {
  var id, rows, giamgia;
  return regeneratorRuntime.async(function _callee47$(_context47) {
    while (1) {
      switch (_context47.prev = _context47.next) {
        case 0:
          id = req.params.id;
          _context47.next = 3;
          return regeneratorRuntime.awrap(Model.single_gg(id));

        case 3:
          rows = _context47.sent;
          giamgia = rows[0];
          console.log("giamgia", giamgia);
          res.render("vwadmin/giamgia/edit", {
            giamgia: giamgia,
            layout: "admin"
          });

        case 7:
        case "end":
          return _context47.stop();
      }
    }
  });
}); //cap nhat

router.post("/giamgia/update", restrict.admin, function _callee48(req, res) {
  var entity;
  return regeneratorRuntime.async(function _callee48$(_context48) {
    while (1) {
      switch (_context48.prev = _context48.next) {
        case 0:
          entity = {
            makm: req.body.makm,
            giakm: req.body.giakm
          };
          _context48.next = 3;
          return regeneratorRuntime.awrap(Model.update_gg(entity));

        case 3:
          res.redirect("/admin/giamgia");

        case 4:
        case "end":
          return _context48.stop();
      }
    }
  });
}); ////////////////End Giảm Giá////////////////

module.exports = router;