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
// router.post("/", async (req, res) => {
//   const post = new Post({
//     title: req.body.title,
//     desc: req.body.desc,
//     username: req.body.username,
//     id: req.body.id
//   });
//   const result = await post.save();
//   res.status(200).json(result);
// });

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

// delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    try {
      const deletedPost = await Post.findByIdAndDelete(req.params.id);
      res.status(200).json("deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
