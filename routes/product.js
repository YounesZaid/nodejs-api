const express = require("express");

const { getProducts } = require("../controllers/product");

const router = express.Router();

/** PRODUCT CRUD API */
router.get("/stuff", getProducts);

module.exports = router;
