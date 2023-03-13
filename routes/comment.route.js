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
router.patch("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("update your account to continue");
  }
});

module.exports = router;
