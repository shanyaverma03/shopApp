const express = require("express");
const check = require("express-validator");

const authController = require("../controllers/authController");
const User = require("../models/user");

const router = express.Router();
const checkFunction = check.check;
const body = check.body;

router.post(
  "/login",
  [
    checkFunction("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
  ],
  authController.login
);
router.post("/logout", authController.logout);
router.post(
  "/signup",
  [
    checkFunction("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom(async (value, { req }) => {
        const findUser = await User.findOne({ email: value });
        if (findUser) {
          return Promise.reject("User already exists!");
        }
      })
      .normalizeEmail(),
    body(
      "password",
      "Please enter a password with only numbers and text and at least 6 characters"
    )
      .isLength({ min: 6 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords don't match!!");
        }
        return true;
      }),
  ],
  authController.signup
);

module.exports = router;
