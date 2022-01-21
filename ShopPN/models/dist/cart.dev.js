"use strict";

module.exports = function Cart(cart) {
  this.items = cart.items || {}; //lưu vào items

  this.totalItems = cart.totalItems || 0; //toong soluong

  this.totalPrice = cart.totalPrice || 0; // tong gia
  //console.log("dongph3-2", this.items);

  this.add = function (item, id) {
    var cartItem = this.items[id];

    if (!cartItem) {
      cartItem = this.items[id] = {
        item: item,
        masp: item.masp,
        tensps: item.TenSP,
        tensp: item.color + "-" + item.size,
        dongia: item.gia,
        sp_id: item.sp_id,
        quantity: 0,
        gia: 0
      };
    }

    this.totalPrice -= cartItem.gia;
    cartItem.quantity += item.quantitys;
    cartItem.gia = cartItem.item.gia * cartItem.quantity;
    this.totalItems += item.quantitys;
    this.totalPrice += cartItem.gia;
  };

  this.update = function (item, id) {
    var cartItem = this.items[id];

    if (!cartItem) {
      cartItem = this.items[id] = {
        item: item,
        masp: item.masp,
        tensp: item.color + "-" + item.size,
        dongia: item.gia,
        sp_id: item.sp_id,
        quantity: 0,
        gia: 0
      };
    }

    this.totalPrice -= cartItem.gia;
    this.totalItems -= cartItem.quantity;
    cartItem.item.quantitys = item.quantitys;
    cartItem.quantity = item.quantitys;
    cartItem.gia = cartItem.item.gia * cartItem.quantity;
    this.totalItems += item.quantitys;
    this.totalPrice += cartItem.gia;
  };

  this.remove = function (id) {
    this.totalItems -= this.items[id].quantity;
    this.totalPrice -= this.items[id].gia;
    delete this.items[id];
  };

  this.reduceByOne = function (id) {
    this.items[id].quantity--;
    this.items[id].gia -= this.items[id].item.price;
    this.totalItems--;
    this.totalPrice -= this.items[id].item.gia;

    if (this.items[id].quantity <= 0) {
      delete this.items[id];
    }
  };

  this.getItems = function () {
    var arr = [];

    for (var id in this.items) {
      arr.push(this.items[id]);
    }

    return arr;
  };
};