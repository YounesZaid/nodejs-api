const express = require("express");

const { getProducts, createProduct } = require("../controllers/product");

const router = express.Router();

/** PRODUCT CRUD API */
router.get("/stuff", getProducts);
router.post("/stuff", createProduct);

module.exports = router;
