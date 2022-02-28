const Post = require("../models/post");

exports.getPosts = (req, res) => {
  Post.find()
    .select("_id title body")
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

  // handling errors inside while saving data
  /* 
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
  */

  // let the midleware validator check fields requirement (inside creation route controller)
  post.save().then((result) => {
    res.json({ result });
  });
};
