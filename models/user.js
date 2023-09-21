const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

class User {
  constructor(username, email, cart, _id) {
    this.name = username;
    this.email = email;
    this.cart = cart; //{items:[]}
    this._id = _id;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => {
        return err;
      });
  }

  addToCart(product) {
    const db = getDb();
    //find if the product exists in the cart or not
    const cartProductIndex = this.cart.items.findIndex((cartProduct) => {
      return cartProduct.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new mongodb.ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    const updatedCart = {
      items: updatedCartItems,
    };

    return db.collection("users").updateOne(
      { _id: new mongodb.ObjectId(this._id) },
      { $set: { cart: updatedCart } } //this will overwrite the current cart as of now
    );
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map((product) => {
      return product.productId;
    });
    //find all the products whose ids are in the cart items
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((product) => {
          return {
            ...product,
            quantity: this.cart.items.find((productInCart) => {
              return (
                productInCart.productId.toString() === product._id.toString()
              );
            }).quantity,
          };
        });
      })
      .catch((err) => {
        return err;
      });
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .find({ _id: new mongodb.ObjectId(userId) })
      .next()
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => {
        return err;
      });
  }
}

module.exports = User;
