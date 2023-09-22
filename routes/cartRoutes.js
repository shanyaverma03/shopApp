const express = require("express");

const cartController = require("../controllers/cartController");

const router = express.Router();

router.post("/cart", cartController.addToCart);
router.get("/cart", cartController.getCart);

router.delete("/cart/:productId", cartController.deleteFromCart);

module.exports = router;
