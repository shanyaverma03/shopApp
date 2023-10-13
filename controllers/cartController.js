const Product = require("../models/product");
const Order = require("../models/order");

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
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      console.log(user);
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err.message);
    });
};

exports.deleteFromCart = (req, res, next) => {
  const prodId = req.params.productId;
  req.user
    .deleteItemFromCart(prodId)
    .then(res.send("deleted"))
    .catch((err) => res.status(500).send(err.message));
};

exports.addOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((item) => {
        return { quantity: item.quantity, product: { ...item.productId._doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user,
        },
        products,
      });

      return order.save();
    })
    .then((result) => {
      req.user.clearCart();
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      return res.send(err);
    });
};
