const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");

const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");

let dotenv = require("dotenv");
dotenv.config();

const User = require("./models/user");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.MY_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

//for every incoming req, get the user
app.use((req, res, next) => {
  User.findById("650da7bfb8c8c8438a810dac")
    .then((user) => {
      req.user = user; //user is a complete mongoose model. Hence all the mongoose functions can be called on it
      next();
    })
    .catch((err) => console.log(err));
});

app.use(productRoutes);
app.use(cartRoutes);
app.use(orderRoutes);
app.use(authRoutes);

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
