exports.postAddProduct = (req, res, next) => {
  console.log(req.body);
  res.send("I am in post product");
};
