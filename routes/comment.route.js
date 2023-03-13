const router = require("express").Router();
const User = require("../models/user.model");
const Comment = require("../models/comment.model");
//const Post = require("../models/post.model");

// CREATE COMMENT
router.post("/", async (req, res) => {
  const comment = new Comment({
    content: req.body.content,
    username: req.body.username,
    id: req.body.id,
  });
  const result = await comment.save();
  res.status(200).json(result);
});

// GET SINGLE COMMENT
router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const { pssword, ...more } = comment._doc;
    res.status(200).json(more);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USERS
router.get("/", async (req, res) => {
  const comment = await Comment.find();
  if (comment) {
    //console.log(user);
    return res.status(200).json(comment);
  } else {
    return res.status(500).json(err);
  }
});

// UPDATE COMMENT
router.put("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedComment);
    } catch (err) {
      res.status(500).json();
    }
  } catch (err) {
    res.status(500).json();
  }
});

// delete comment
router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    try {
      const deletedComment = await Comment.findByIdAndDelete(req.params.id)
      res.status(200).json('deleted');
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
