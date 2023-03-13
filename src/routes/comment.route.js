const express = require('express')
const router = express.Router()
const postController = require('../controllers/post.controller')
const commentController = require('../controllers/comment.controller')
const ensureAuthenticated = require("../middlewares/auth.middleware")

router.post('/',ensureAuthenticated,  commentController.addComment)
router.get('/:id',ensureAuthenticated, commentController.fetchComment)
router.patch('/:id',ensureAuthenticated, commentController.editComment)
router.get('/',ensureAuthenticated, commentController.fetchComments)
router.delete('/:id',ensureAuthenticated, commentController.deleteComment)

module.exports = router