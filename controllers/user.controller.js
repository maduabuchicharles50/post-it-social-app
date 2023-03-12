// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const user = require("../models/user.model");

// const { ACCESS_TOKEN_SECRET = "secret" } = process.env;

// class UserController {
//   // register user
//   async register(req, res) {
//     req.body.password = await bcrypt.hash(req.body.password, 8);

//     const userProfile = await user.create(req.body);
//     return res.status(201).send({
//       success: true,
//       message: "User created",
//       data: userProfile,
//     });
//   }

//   // login user
//   async login(req, res) {
//     try {
//       const userProfile = await user.findOne({ username: req.body.username });
//       if (userProfile) {
//         const result = await bcrypt.compare(req.body.password, user.password);
//         if (result) {
//           const token = await jwt.sign(
//             { username: user.username },
//             ACCESS_TOKEN_SECRET
//           );
//           return res.json({ token });
//         } else {
//           return res.status(400).json({ error: "password doesn't match" });
//         }
//       } else {
//         return res.status(400).json({ error: "User doesn't exist" });
//       }
//     } catch (error) {
//       return res.status(400).json({ error });
//     }
//   }
// }

// module.exports = new UserController();
