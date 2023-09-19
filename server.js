const express = require("express");

const app = express();

app.post("/product", (req, res, next) => {
  res.send("I am in post product");
});

app.listen(8080);
