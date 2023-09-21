const mongodb = require("mongodb");

const getDb = require("../util/database").getDb;

class Product {
  constructor(title, description, image, price, _id, userId) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.price = price;
    this._id = _id ? new mongodb.ObjectId(_id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      //update the product
      dbOp = db
        .collection("products")
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      //insert the product
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then((result) => {
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
        return product;
      })
      .catch((err) => {
        return err;
      });
  }

  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({
        _id: new mongodb.ObjectId(prodId),
      })
      .then((result) => {
        console.log("Deleted");
        return "Successfully deleted";
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Product;
