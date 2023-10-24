const fs = require("fs");
const path = require("path");

const Product = require("../models/product");
const Order = require("../models/order");
const User = require("../models/user");

exports.addToCart = async (req, res, next) => {
  const prodId = req.body.productId;
  const foundUser = await User.findById(req.userId);
  Product.findById(prodId)
    .then((product) => {
      return foundUser.addToCart(product);
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

exports.getCart = async (req, res, next) => {
  const foundUser = await User.findById(req.userId);
  foundUser
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

exports.deleteFromCart = async (req, res, next) => {
  const prodId = req.params.productId;
  const foundUser = await User.findById(req.userId);
  foundUser
    .deleteItemFromCart(prodId)
    .then(res.send("deleted"))
    .catch((err) => res.status(500).send(err.message));
};

exports.addOrder = async (req, res, next) => {
  const foundUser = await User.findById(req.userId);
  foundUser
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
      foundUser.clearCart();
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

exports.getOrders = async (req, res, next) => {
  const foundUser = await User.findById(req.userId);
  Order.find({ "user.userId": foundUser._id })
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      return res.send(err);
    });
};

exports.getInvoice = async (req, res, next) => {
  const orderId = req.params.orderId;
  const foundUser = await User.findById(req.userId);
  Order.findById(orderId)
    .then((order) => {
      if (!order) {
        return res.send("Order not found");
      }
      if (order.user.userId.toString() !== foundUser._id.toString()) {
        return res.send("User not authenticated");
      }
      const invoiceName = "invoice-" + orderId + ".pdf";
      const invoicePath = path.join("data", "invoices", invoiceName);
      fs.readFile(invoicePath, (err, data) => {
        if (err) {
          console.log(err);
          return res.send("Error in reading file");
        }
        res.setHeader("Content-Type", "application/pdf");
        res.send(data);
      });
    })
    .catch((err) => {
      console.log(err);
      return res.send("An error occured");
    });
};
