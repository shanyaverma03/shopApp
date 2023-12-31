const bcrypt = require("bcrypt");
const check = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { validationResult } = check;

let dotenv = require("dotenv");
dotenv.config();

exports.login = async (req, res, next) => {
  const { email, enteredPassword } = req.body;

  try {
    const findUser = await User.findOne({ email });
    if (findUser) {
      console.log("user found");
      const doMatch = await bcrypt.compare(enteredPassword, findUser.password);
      if (doMatch) {
        console.log("password matched");
        const token = jwt.sign(
          {
            email,
            userId: findUser._id.toString(),
          },
          process.env.SECRET,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({ token, userId: findUser._id.toString() });
      } else {
        console.log("password not matched");
        res.send("Password is incorrect");
      }
    } else {
      res.send("User doesn't exist! Please sign up");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.logout = (req, res, next) => {
  res.send("loggedout");
};

exports.signup = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("errors is not empty");
    console.log(errors.array());
    //return res.status(422).send(errors.array()[0].msg);
    return res.send(errors.array()[0].msg);
  }
  try {
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
