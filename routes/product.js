const express = require("express");

const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
} = require("../controllers/product");

const router = express.Router();

/** PRODUCT CRUD API */
router.post("/stuff", createProduct);
router.get("/stuff", getProducts);
router.get("/stuff/:id", getProduct);
router.put("/stuff/:id", updateProduct);

module.exports = router;
