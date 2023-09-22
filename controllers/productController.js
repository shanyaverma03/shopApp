const Product = require("../models/product");
const User = require("../models/user");

exports.addProduct = (req, res, next) => {
  const { title, description, image, price } = req.body;

  const product = new Product({
    title,
    description,
    image,
    price,
  });

  product
    .save()
    .then((savedProduct) => {
      console.log("created product", savedProduct);
      res.json(savedProduct);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      console.log(products);
      res.send(products);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  //mongoose automatically converts our id to ObjectId
  Product.findById(prodId)
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

exports.updateProduct = (req, res, next) => {
  const { title, description, image, price } = req.body;
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then((product) => {
      product.title = title;
      product.description = description;
      product.image = image;
      product.price = price;
      return product.save();
    })
    .then((product) => {
      console.log("Updated product", product);
      res.json(product);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.deleteById(prodId)
    .then((message) => {
      res.send(message);
    })
    .catch((err) => res.send(err.message));
};
