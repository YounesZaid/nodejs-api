const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  imageUrl: { type: String },
  price: { type: Number },
  userId: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
