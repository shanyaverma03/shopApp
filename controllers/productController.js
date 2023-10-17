const check = require("express-validator");

const Product = require("../models/product");
const User = require("../models/user");

const { validationResult } = check;

const ITMES_PER_PAGE = 2;

exports.addProduct = (req, res, next) => {
  const { title, description, price } = req.body;
  const imageReceived = req.file;
  if (!imageReceived) {
    return res.send("Please add a valid image");
  }
  const image = imageReceived.path;
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

exports.getProducts = async (req, res, next) => {
  const page = req.query.page;
  try {
    const totalProducts = await Product.find().count();
    const products = await Product.find()
      .skip((page - 1) * ITMES_PER_PAGE)
      .limit(ITMES_PER_PAGE);
    const productDetails = {
      products,
      totalProducts,
      hasNextPage: ITMES_PER_PAGE * page < totalProducts,
      hasPreviousPage: page > 1,
      nextPage: parseInt(page) + 1,
      previousPage: parseInt(page) - 1,
      lastPage: Math.ceil(totalProducts / ITMES_PER_PAGE),
    };
    res.send(productDetails);
  } catch (err) {
    res.status(500).send(err.message);
  }
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
  const { title, description, price } = req.body;
  const imageReceived = req.file;
  const prodId = req.params.productId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send(errors.array()[0].msg);
  }
  Product.findById(prodId)
    .then((product) => {
      product.title = title;
      product.description = description;
      if (imageReceived) {
        product.image = imageReceived.path;
      }
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
