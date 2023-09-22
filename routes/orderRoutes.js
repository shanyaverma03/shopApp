const express = require("express");

const cartController = require("../controllers/cartController");

const router = express.Router();

router.post("/order", cartController.addOrder);

router.get("/orders", cartController.getOrders);

module.exports = router;
