const Post = require("../models/post");

exports.getPosts = (req, res) => {
  res.json();
};
exports.createPost = (req, res) => {
  const post = new Post(req.body);
  console.log("CREATING NEW POST ", req.body);
};
