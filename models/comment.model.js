const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },

}, 
{timestamps: true}
);

module.exports = mongoose.model("CommentModel", commentSchema);
