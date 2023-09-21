const express = require("express");
const bodyParser = require("body-parser");

const productController = require("./controllers/productController");

const mongoConnect = require("./util/database").mongoConnect;

const User = require("./models/user");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findById("650c9fb463c98ee2ee9e68cd")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.post("/product", productController.addProduct);
app.get("/products", productController.getProducts);

app.get("/product/:productId", productController.getProduct);
app.put("/product/:productId", productController.updateProduct);
app.delete("/product/:productId", productController.deleteProduct);

mongoConnect();
app.listen(8080);
