const express = require('express')
const router = express.Router()
const postController = require('../controllers/post.controller')
const ensureAuthenticated = require("../middlewares/auth.middleware")


router.post('/',ensureAuthenticated,  postController.addPost)
router.get('/:id',ensureAuthenticated, postController.fetchPost)
router.patch('/:id',ensureAuthenticated, postController.editPost)
router.get('/',ensureAuthenticated, postController.fetchPosts)
router.delete('/:id',ensureAuthenticated, postController.deletePost)

module.exports = router