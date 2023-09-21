const mongodb = require("mongodb");

const getDb = require("../util/database").getDb;

class Product {
  constructor(title, description, image, price) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.price = price;
  }

  save() {
    const db = getDb();
    return db
      .collection("products")
      .insertOne(this)
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        return err;
      });
  }

  static fetchAll() {
    //find returns a Cursor
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => {
        return err;
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => {
        return err;
      });
  }
}

module.exports = Product;
