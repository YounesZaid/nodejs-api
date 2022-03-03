const Post = require("../models/post");

exports.getPosts = async (req, res) => {
  // Post.find()
  //   .select("_id title body")
  //   .then((posts) => res.send(posts))
  //   .catch((err) => {
  //     res.status(500).send({
  //       error: err || "Error while retrieving posts",
  //     });
  //   });
  try {
    const data = await Post.find();
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
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
exports.getPost = async (req, res) => {
  console.log("Get Post by id", req.params.id);
  try {
    const data = await Post.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Post.findByIdAndUpdate(id, updatedData, options);
    res.send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
exports.deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Post.findByIdAndDelete(id);
    res.send(`Post with id : ${id} has been deleted...`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
