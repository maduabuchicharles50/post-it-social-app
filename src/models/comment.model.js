const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    postId: {
        type: mongoose.Types.ObjectId,
        ref: "Post"
    },
    deleted: {
      type: Boolean,
      default: false,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("CommentModel", CommentSchema);
