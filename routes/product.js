const express = require("express");

const {
  getProducts,
  createProduct,
  getProduct,
} = require("../controllers/product");

const router = express.Router();

/** PRODUCT CRUD API */
router.post("/stuff", createProduct);
router.get("/stuff", getProducts);
router.get("/stuff/:id", getProduct);

module.exports = router;
