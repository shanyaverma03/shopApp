const express = require("express");
const bodyParser = require("body-parser");

const mongoConnect = require("./util/database").mongoConnect;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/product", (req, res, next) => {
  console.log(req.body);
  res.send("I am in post product");
});

mongoConnect(() => {
  app.listen(8080);
});
