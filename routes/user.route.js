const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

router.post('/',  userController.addUser)
router.get('/:id', userController.fetchUser)
router.patch('/:id', userController.editUser)
router.get('/', userController.fetchUsers)
router.delete('/:id', userController.deleteUser)

module.exports = router