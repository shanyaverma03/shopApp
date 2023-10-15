const express = require("express");
const check = require("express-validator");

const productController = require("../controllers/productController");

const router = express.Router();
const body = check.body;

router.get("/products", productController.getProducts);

router.post(
  "/product",
  [
    body("title", "Please enter a valid title")
      .isString()
      .isLength({ min: 3 })
      .trim(),

    body("price", "Please choose a valid price").isNumeric(),
    body("description", "Please enter a valid description")
      .trim()
      .isLength({ min: 8, max: 200 }),
  ],
  productController.addProduct
);
router.get("/product/:productId", productController.getProduct);
router.put(
  "/product/:productId",
  [
    body("title", "Please enter a valid title")
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body("price", "Please choose a valid price").isNumeric(),
    body("description", "Please enter a valid description")
      .trim()
      .isLength({ min: 8, max: 200 }),
  ],
  productController.updateProduct
);
router.delete("/product/:productId", productController.deleteProduct);

module.exports = router;
