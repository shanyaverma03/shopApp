const express = require("express");

const cartController = require("../controllers/cartController");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/cart", isAuth, cartController.addToCart);
router.get("/cart", isAuth, cartController.getCart);

router.delete("/cart/:productId", isAuth, cartController.deleteFromCart);

module.exports = router;
