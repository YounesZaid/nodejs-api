const Post = require("../models/post");

exports.getPosts = (req, res) => {
  Post.find()
    .then((posts) => res.send(posts))
    .catch((err) => {
      res.status(500).send({
        error: err || "Error while retrieving posts",
      });
    });
};
exports.createPost = (req, res) => {
  const post = new Post(req.body);
  console.log("CREATING NEW POST ", post);
  post.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.status(200).json({
      post: result,
    });
  });
};
