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
router.post("/", createPostValidator, createPost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
