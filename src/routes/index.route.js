const express = require("express");
const router = express.Router();
const postRoute = require("./post.route");
const userRoute = require("./user.route");
const authRoute = require("./authenticationRoute");
const commentRoute = require("./comment.route");

router.use("/auth", authRoute);
router.use("/post", postRoute);
router.use("/user", userRoute);
router.use("/comment", commentRoute);

module.exports = router;
