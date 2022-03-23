const Product = require("../models/product");
const fs = require("fs");

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
  const productObject = JSON.parse(req.body.thing);
  // delete default _id created in the front-end client
  delete productObject._id;
  const product = new Product({
    ...productObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  product
    .save()
    .then((data) =>
      res.status(201).json({ data, message: "product successfully created !" })
    )
    .catch((err) => res.status(400).json({ err }));
};

exports.updateProduct = (req, res, next) => {
  const productObject = req.file
    ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Product.findOneAndUpdate(
    { _id: req.params.id },
    { ...productObject, _id: req.params.id }
  )
    .then((response) =>
      res.json({ message: "updated successfully", data: response })
    )
    .catch((err) => res.status(400).json(err));
};

exports.deleteProduct = (req, res) => {
  Product.findOne({ _id: req.params.id })
    .then((product) => {
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
      const filename = product.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Product.deleteOne({ _id: req.params.id })
          .then((data) => res.json({ data, message: "deleted successfully" }))
          .catch((error) => res.json({ error }));
      });
    })
    .catch((error) => {
      res.json({ error });
    });
};
