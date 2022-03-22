const Product = require("../models/product");

exports.getProducts = (req, res) => {
  debugger;
  Product.find()
    .then((products) => res.status(200).json(products))
    .catch((err) => res.status(400).json({ err }));
};

exports.getProduct = (req, res) => {
  const productId = req.params.id;
  Product.findOne({ _id: productId })
    .then((product) => res.status(200).json(product))
    .catch((err) => res.status(404).json({ err }));
};

exports.createProduct = (req, res) => {
  // delete default _id created in the front-end client
  delete req.body._id;
  const product = new Product({ ...req.body });

  product
    .save()
    .then((data) =>
      res.status(201).json({ data, message: "product successfully created !" })
    )
    .catch((err) => res.status(400).json({ err }));
};

exports.updateProduct = (req, res, next) => {
  Product.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body, _id: req.params.id }
  )
    .then((response) =>
      res.json({ message: "updated successfully", data: response })
    )
    .catch((err) => res.status(400).json(err));
};

exports.deleteProduct = (req, res) => {
  Product.findOne({ _id: req.params.id }).then((product) => {
    if (!product) {
      return res.status(404).json({
        error: new Error("No product found"),
      });
    }
    if (product.userId !== req.auth.userId) {
      return res.status(401).json({
        error: new Error("Unauthorized"),
      });
    }
    Product.deleteOne({ _id: req.params.id })
      .then((data) => res.json({ data, message: "deleted successfully" }))
      .catch((error) => res.json({ error }));
  });
};
