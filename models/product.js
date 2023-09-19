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
}

module.exports = Product;
