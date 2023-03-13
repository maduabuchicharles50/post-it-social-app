const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },

    desc: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },

    role: {
      type: String,
      default: "guest",
      lowercase: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PostModel", postSchema);
