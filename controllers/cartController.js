const Product = require("../models/product");
const User = require("../models/user");

exports.addToCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      res.json(result);
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err.message);
    });
};

exports.getCart = (req, res, next) => {
  const cart = req.user.getCart();
  return res.json(cart);
};
