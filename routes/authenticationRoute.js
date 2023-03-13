const express = require("express")
const router = express.Router()
const Authentication = require("../controllers/auth.controller")


router.post("/register", Authentication.register)
router.post("/login", Authentication.login)

module.exports = router