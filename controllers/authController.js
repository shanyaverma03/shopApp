const bcrypt = require("bcrypt");

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

exports.signup = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  try {
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.send("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      password: hashedPassword,
      cart: { items: [] },
    });
    const response = await user.save();
    console.log(response);
    res.send("User created");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
