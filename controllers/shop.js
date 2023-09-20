const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};
