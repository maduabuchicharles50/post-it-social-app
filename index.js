const express = require("express");
const mongoose = require("mongoose");
//const bcrypt = require('bcrypt')
require("dotenv").config();
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const postRoute = require("./routes/post.route");
const commentRoute = require("./routes/comment.route");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use('/api/v1', homeRoute)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch(() => {
    console.log("There was an error connecting to your database");
  });

const port = process.env.PORT || 5000;
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
