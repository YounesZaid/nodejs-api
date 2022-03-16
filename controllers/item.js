const Item = require("../models/item");

exports.getItems = (req, res) => {
  Item.find()
    .then((products) => res.status(200).json({ products }))
    .catch((err) => res.status(400).json({ err }));
};

exports.getItem = (req, res) => {
  const productId = req.params.id;
  Item.findOne({ _id: productId })
    .then((product) => res.status(200).json(product))
    .catch((err) => res.status(404).json({ err }));
};

exports.createItem = (req, res) => {
  delete req.body._id;
  const product = new Item({ ...req.body });
  product
    .save()
    .then((product) => res.status(200).json({ product }))
    .catch((err) => res.status(404).json({ err }));
};

exports.updateItem = (req, res) => {
  Item.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Modified!" }))
    .catch((err) => res.status(404).json({ err }));
};

exports.deleteItem = (req, res) => {
  Item.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Deleted!" }))
    .catch((err) => res.status(404).json({ err }));
};
