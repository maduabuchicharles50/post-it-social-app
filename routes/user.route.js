const router = require("express").Router();
const User = require("../models/user.model");
const Post = require("../models/post.model");
const bcrypt = require("bcryptjs");

// UPDATE USER
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
      res.status(200).json("User Updated successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("update your account to continue");
  }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("user deleted successfully");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("user not Found");
    }
  } else {
    res.status(401).json("delete your account");
  }
});

module.exports = router;
