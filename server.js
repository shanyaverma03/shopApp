const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productController = require("./controllers/productController");
const cartController = require("./controllers/cartController");

let dotenv = require("dotenv");
dotenv.config();

// const User = require("./models/user");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   User.findById("650c9fb463c98ee2ee9e68cd")
//     .then((user) => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch((err) => console.log(err));
// });

app.get("/products", productController.getProducts);

app.post("/product", productController.addProduct);
app.get("/product/:productId", productController.getProduct);
app.put("/product/:productId", productController.updateProduct);
app.delete("/product/:productId", productController.deleteProduct);

app.post("/cart", cartController.addToCart);
app.get("/cart", cartController.getCart);
app.delete("/cart/:productId", cartController.deleteFromCart);

app.post("/order", cartController.addOrder);

app.get("/orders", cartController.getOrders);

mongoose
  .connect(process.env.MONGO_CONNECT)
  .then((result) => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(8080);
