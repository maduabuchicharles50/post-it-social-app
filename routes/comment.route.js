const router = require("express").Router();
const User = require("../models/user.model");
const Comment = require("../models/comment.model");
//const Post = require("../models/post.model");

// CREATE COMMENT
router.post("/", async (req, res) => {
  const comment = new Comment ({
      content :req.body.content,
      username: req.body.username,
      id : req.body.id
  })
  const result = await comment.save()
  res.status(200).json(result)


});

module.exports = router;
