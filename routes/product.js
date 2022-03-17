const express = require("express");

const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const auth = require("../middleware/auth");

const router = express.Router();

/** PRODUCT CRUD API */
router.post("/stuff", auth, createProduct);
router.get("/stuff", auth, getProducts);
router.get("/stuff/:id", auth, getProduct);
router.put("/stuff/:id", auth, updateProduct);
router.delete("/stuff/:id", auth, deleteProduct);

module.exports = router;
