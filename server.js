const express = require("express");
const bodyParser = require("body-parser");

const adminController = require("./controllers/admin");
const shopController = require("./controllers/shop");

const mongoConnect = require("./util/database").mongoConnect;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/admin/product", adminController.postAddProduct);
app.get("/admin/products", adminController.getAdminProducts);
app.get("/products", shopController.getProducts);
app.get("/products/:productId", shopController.getProduct);

mongoConnect();
app.listen(8080);
