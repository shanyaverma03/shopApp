const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");

let dotenv = require("dotenv");
dotenv.config();

const User = require("./models/user");

const app = express();
const store = new MongoDBStore({
  uri: process.env.MONGO_CONNECT_SESSION,
  collection: "sessions",
});

store.on("error", function (error) {
  console.log(error);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.MY_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
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
