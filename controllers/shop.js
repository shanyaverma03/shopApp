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

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};
