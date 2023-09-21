const express = require("express");
const bodyParser = require("body-parser");

const productController = require("./controllers/productController");

const mongoConnect = require("./util/database").mongoConnect;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/product", productController.addProduct);
app.get("/products", productController.getProducts);

app.get("/product/:productId", productController.getProduct);

mongoConnect();
app.listen(8080);
