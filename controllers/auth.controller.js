const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class AuthController {
  async register(req, res) {
    const exist = await User.findOne({ username: req.body.username });
    if (exist) {
      return res.status(400).send("The email or username is taken");
    }

    try {


      const createdUser = await User.create(req.body);

      return res.status(201).send({
        message: "Registered successfully",
        data: createdUser,
      });
    } catch (error) {
      return res.status(400).send({
        message: "err",
        data: error,
      });
    }
  }

  async login(req, res) {
    try {
        const userData = await User.findOne({ username: req.body.username });
      if (userData) {
        if (bcrypt.compareSync(req.body.password, userData.password)) {
          let token = jwt.sign({ data: userData }, process.env.SECRET, {
            expiresIn: "12h",
          });

          return res.status(200).send({
            message: "Login successfully",
            data: userData,
            token: token,
          });
        } else {
          return res.status(400).send("Invalid Credential");
        }
      } else {
        return res.status(400).send("Invalid username or password");
      }
    } catch (error) {
      return res.status(400).send({
        message: "Invalid Credential 1",
      });
    }
  }
}

module.exports = new AuthController();
