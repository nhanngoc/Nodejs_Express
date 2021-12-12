"use strict";

module.exports = function Cart(cart) {
  this.items = cart.items || {};
  this.totalItems = cart.totalItems || 0; //toongr soluong

  this.totalPrice = cart.totalPrice || 0; // tong gia

  console.log("dongph3-2", this.items);

  this.add = function (item, id) {
    var cartItem = this.items[id];

    if (!cartItem) {
      cartItem = this.items[id] = {
        item: item,
        masp: item.masp,
        tensp: item.color + "-" + item.size,
        quantity: 0,
        gia: 0
      };
    }

    cartItem.quantity++;
    cartItem.gia = cartItem.item.gia * cartItem.quantity;
    this.totalItems++;
    this.totalPrice += cartItem.item.gia;
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

  this.remove = function (id) {
    this.totalItems -= this.items[id].quantity;
    this.totalPrice -= this.items[id].gia;
    delete this.items[id];
  };

  this.getItems = function () {
    var arr = [];

    for (var id in this.items) {
      arr.push(this.items[id]);
    }

    return arr;
  };
};