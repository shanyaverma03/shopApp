const express = require("express");

const cartController = require("../controllers/cartController");

const router = express.Router();

router.post("/order", cartController.addOrder);

router.get("/orders", cartController.getOrders);
router.get("/orders/:orderId", cartController.getInvoice);

module.exports = router;
