const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const ensureAuthenticated = require("../middlewares/auth.middleware")


router.post('/',ensureAuthenticated,  userController.addUser)
router.get('/:id',ensureAuthenticated, userController.fetchUser)
router.patch('/:id',ensureAuthenticated, userController.editUser)
router.get('/',ensureAuthenticated, userController.fetchUsers)
router.delete('/:id',ensureAuthenticated, userController.deleteUser)

module.exports = router