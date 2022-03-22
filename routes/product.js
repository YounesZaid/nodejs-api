const express = require("express");

const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const router = express.Router();

/** PRODUCT CRUD API */
router.post("/stuff", auth, multer, createProduct);
router.get("/stuff", auth, getProducts);
router.get("/stuff/:id", auth, getProduct);
router.put("/stuff/:id", auth, updateProduct);
router.delete("/stuff/:id", auth, deleteProduct);

module.exports = router;
