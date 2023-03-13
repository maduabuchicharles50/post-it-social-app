const router = require("express").Router();
const User = require("../models/user.model");
const Post = require("../models/post.model");

// CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (err) {
    res.status(500).json("err");
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(500).json();
    }
  } catch (err) {
    res.status(500).json();
  }
});

// GET A SINGLE POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const post = await Post.find();
  if (post) {
    return res.status(200).json(post);
  } else {
    return res.status(500).json(err);
  }
});

// DELETE POST  postRoute/delete
router.delete("/:id", async (req, res) => {
  
    const post = await Post.findByIdAndUpdate(
      req.params.Id,
      { new: true }
    );

    if (!post) {
      return res.status(400).send("Post not found");
    // const post = await Post.findById(req.params.id);
    // if (post.username === req.body.username) {
    //   try {
    //     await post.delete();
    //     res.status(200).json("post deleted");
    //   } catch (err) {
    //     res.status(500).json(err);
    //   }
    // } else {
    //   res.status(401).json("delete only your post");
    // }
    }
});

module.exports = router;
