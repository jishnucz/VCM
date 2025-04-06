// ====== routes/posts.js ======
const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Create post
router.post("/", async (req, res) => {
  try {
    const { content } = req.body;
    const post = new Post({ content });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ pinned: -1, createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update post content
router.put("/:id", async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findByIdAndUpdate(req.params.id, { content }, { new: true });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete post
router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Pin/Unpin post
router.patch("/:id/pin", async (req, res) => {
  try {
    const { pinned } = req.body;
    const post = await Post.findByIdAndUpdate(req.params.id, { pinned }, { new: true });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;