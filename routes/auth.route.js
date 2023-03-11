const router = require("express").Router();
const User = require("../models/user.model");
//const bcrypt = require("bcryptjs");
//const jwt = require('jsonwebtoken')
const { registerValidation } = require("../validation");

// Register
router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if user already exist
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exist");

  try {
    //const salt = await bcrypt.genSalt(10);
    //const hashpwd = await bcrypt.hash(req.body.password, salt);

    //created a new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN FUNCTIONALITY
// router.post("/login", async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.body.username });
//     if (user) {
//       const result = await bcrypt.compare(req.body.password, user.password);
//       if (result) {
//         const token = await jwt.sign({ username: user.username }, SECRET);
//         return res.json({ token });
//       } else {
//         return res.status(400).json({ error: "password doesn't match" });
//       }
//     } else {
//       return res.status(400).json({ error: "User doesn't exist" });
//     }
//   } catch (error) {
//     return res.status(400).json({ error });
//   }
// });

module.exports = router;
