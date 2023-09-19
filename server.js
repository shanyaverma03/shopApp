const express = require("express");
const bodyParser = require("body-parser");

const adminController = require("./controllers/admin");

const mongoConnect = require("./util/database").mongoConnect;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/product", adminController.postAddProduct);

mongoConnect(() => {
  app.listen(8080);
});
