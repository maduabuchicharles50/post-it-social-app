const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String
    },

    role: { type: String, default: "user" },
    gender: { type: String, default: "male" },
    mobile: { type: String, default: "" },
    address: { type: String, default: "" },
    story: {
      type: String,
      default: "",
      maxlength: 200,
    },

    timestamps: true,
  }
);

module.exports = mongoose.model("UserModel", userSchema);
