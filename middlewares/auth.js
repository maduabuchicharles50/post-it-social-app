const Users = require("../models/user.model");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token)
      return res.status(400).json({
        message: "Invalid Authentication.",
      });

    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decode)
      return res.status(400).json({
        message: "Invalid Authentication.",
      });

    const user = await Users.findOne({ _id: decode.id });

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = auth;
