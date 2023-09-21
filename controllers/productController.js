const Product = require("../models/product");
const User = require("../models/user");

exports.addProduct = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const image = req.body.image;
  const price = req.body.price;
  const product = new Product(
    title,
    description,
    image,
    price,
    null,
    req.user._id
  );

  product
    .save()
    .then((savedProduct) => {
      res.json(savedProduct);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.send(products);
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

exports.updateProduct = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const image = req.body.image;
  const price = req.body.price;
  const prodId = req.params.productId;
  const product = new Product(title, description, image, price, prodId);
  product
    .save()
    .then((product) => {
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

exports.addToCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err.message);
    });
};
