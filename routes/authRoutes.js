const express = require("express");
const check = require("express-validator");

const authController = require("../controllers/authController");

const router = express.Router();
const checkFunction = check.check;
const body = check.body;

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post(
  "/signup",
  [
    checkFunction("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        if (value === "admin@admin.com") {
          throw new Error("Can't enter this email");
        }
        return true;
      }),
    body(
      "password",
      "Please enter a password with only numbers and text and at least 6 characters"
    )
      .isLength({ min: 6 })
      .isAlphanumeric(),
  ],
  authController.signup
);

module.exports = router;
