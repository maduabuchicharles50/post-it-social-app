const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

// UPDATE USER
router.post("/register", async (req, res) => {
  try {
    
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE USER

module.exports = router;
