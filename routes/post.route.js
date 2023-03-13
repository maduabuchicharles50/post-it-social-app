const express = require('express')
const router = express.Router()
const postController = require('../controllers/post.controller')

router.post('/',  postController.addPost)
router.get('/:id', postController.fetchPost)
router.patch('/:id', postController.editPost)
router.get('/', postController.fetchPosts)
router.delete('/:id', postController.deletePost)

module.exports = router