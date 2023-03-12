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
        res.status(200).json(updatedPost)
      } catch (err) {
        res.status(500).json();
      }
    
  } catch (err) {
    res.status(500).json();
  }
});

// GET A SINGLE POST
router.get("/:id", async (req, res) => {});


// DELETE POST
router.delete("/:id", async (req, res) => {});

module.exports = router;
