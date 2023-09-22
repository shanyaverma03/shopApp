const express = require("express");

const productController = require("../controllers/productController");

const router = express.Router();

router.get("/products", productController.getProducts);

router.post("/product", productController.addProduct);
router.get("/product/:productId", productController.getProduct);
router.put("/product/:productId", productController.updateProduct);
router.delete("/product/:productId", productController.deleteProduct);

module.exports = router;
