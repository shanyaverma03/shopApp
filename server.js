const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productController = require("./controllers/productController");
const cartController = require("./controllers/cartController");

let dotenv = require("dotenv");
dotenv.config();

const User = require("./models/user");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//for every incoming req, get the user
app.use((req, res, next) => {
  User.findById("650da7bfb8c8c8438a810dac")
    .then((user) => {
      req.user = user; //user is a complete mongoose model. Hence all the mongoose functions can be called on it
      next();
    })
    .catch((err) => console.log(err));
});

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
    //create a new user only one it s not present in the collection
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Shanya",
          email: "shanya@test.com",
          cart: {
            items: [],
          },
        });

        user.save();
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(8080);
