const User = require("../models/user");

exports.login = (req, res, next) => {
  console.log("in login");

  User.findById("650da7bfb8c8c8438a810dac")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.send(req.session.isLoggedIn);
    })
    .catch((err) => console.log(err));
};

exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
  });
  res.send("loggedout");
};
