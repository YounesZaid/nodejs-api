const express = require("express");

const {
  createItem,
  getItem,
  getItems,
  updateItem,
  deleteItem,
} = require("../controllers/item");

const router = express.Router();

router.get("/products", getItems);
router.get("/products/:id", getItem);
router.post("/products", createItem);
router.put("/products/:id", updateItem);
router.delete("/products/:id", deleteItem);

module.exports = router;
