const check = require("express-validator");

const Product = require("../models/product");
const User = require("../models/user");

const { validationResult } = check;

exports.addProduct = (req, res, next) => {
  const { title, description, price } = req.body;
  const image = req.file;
  console.log(title);
  console.log(image);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send(errors.array()[0].msg);
  }
  const product = new Product({
    title,
    description,
    image,
    price,
    userId: req.user,
  });

  product
    .save()
    .then((savedProduct) => {
      res.send("Product created");
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .populate("userId")
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send(errors.array()[0].msg);
  }
  Product.findById(prodId)
    .then((product) => {
      product.title = title;
      product.description = description;
      product.image = image;
      product.price = price;
      return product.save();
    })
    .then((product) => {
      res.send("Product updated");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByIdAndRemove(prodId)
    .then((message) => {
      console.log("deleted", message);
      res.send(message);
    })
    .catch((err) => res.send(err.message));
};
