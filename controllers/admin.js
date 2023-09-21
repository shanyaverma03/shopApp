const Product = require("../models/product");

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const image = req.body.image;
  const price = req.body.price;
  const product = new Product(title, description, image, price);

  product
    .save()
    .then((savedProduct) => {
      res.json(savedProduct);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.send(products);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};
