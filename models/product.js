const getDb = require("../util/database").getDb;

class Product {
  constructor(title, description, image, price) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.price = price;
  }

  save() {}
}
