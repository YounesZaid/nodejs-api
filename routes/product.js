const express = require("express");

const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const router = express.Router();

/** PRODUCT CRUD API */
router.post("/stuff", createProduct);
router.get("/stuff", getProducts);
router.get("/stuff/:id", getProduct);
router.put("/stuff/:id", updateProduct);
router.delete("/stuff/:id", deleteProduct);

module.exports = router;
