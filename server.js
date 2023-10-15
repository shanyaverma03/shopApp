const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const multer = require("multer");

const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");

let dotenv = require("dotenv");
dotenv.config();

const User = require("./models/user");

const app = express();
const store = new MongoDBStore({
  uri: "mongodb://localhost:27017/Shop" || process.env.MONGO_CONNECT_SESSION,
  collection: "sessions",
});

store.on("error", function (error) {
  console.log(error);
});

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage }).single("image"));
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
  .connect("mongodb://localhost:27017/Shop" || process.env.MONGO_CONNECT)
  .then((result) => {
    console.log("mongoose connected");
    //create a new user only one it s not present in the collection
  })
  .catch((err) => {
    console.log("mongoose not connected");
    console.log(err);
  });
app.listen(8080);
