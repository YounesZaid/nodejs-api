const express = require("express");
const {
  getPosts,
  createPost,
  updatePost,
  getPost,
  deletePost,
} = require("../controllers/post");
const { createPostValidator } = require("../validators");

const router = express.Router();

/** POST API */
router.post("/post", createPostValidator, createPost);
router.get("/getAllPosts", getPosts);
router.get("/getPost/:id", getPost);
router.patch("/updatePost/:id", updatePost);
router.delete("/deletePost/:id", deletePost);

module.exports = router;
