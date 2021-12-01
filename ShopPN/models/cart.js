module.exports = function Cart(cart) {
  this.items = cart.items || {};
  this.totalItems = cart.totalItems || 0;
  this.totalPrice = cart.totalPrice || 0;

  this.add = function (item, id) {
    var cartItem = this.items[id];
    if (!cartItem) {
      cartItem = this.items[id] = { item: item, quantity: 0, Gia: 0 };
    }
    cartItem.quantity++;
    cartItem.Gia = cartItem.item.Gia * cartItem.quantity;
    this.totalItems++;
    this.totalPrice += cartItem.item.Gia;
  };

  this.reduceByOne = function (id) {
    this.items[id].quantity--;
    this.items[id].Gia -= this.items[id].item.price;
    this.totalItems--;
    this.totalPrice -= this.items[id].item.Gia;
    if (this.items[id].quantity <= 0) {
      delete this.items[id];
    }
  };

  this.remove = function (id) {
    this.totalItems -= this.items[id].quantity;
    this.totalPrice -= this.items[id].Gia;
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
