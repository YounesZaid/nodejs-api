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

/** POST CRUD API */
router.post("/post", createPostValidator, createPost);
router.get("/posts", getPosts);
router.get("/post/:id", getPost);
router.patch("/post/:id", updatePost);
router.delete("/post/:id", deletePost);

module.exports = router;
