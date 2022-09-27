const express = require('express');

const postController = require('../controllers/posts');

router = express.Router();

router.post('/createPost', postController.createPost);
router.post('/comments/:id/:postId', postController.addComment);
router.post('/likes/:id/:postId', postController.likePost);
router.post('/likeComments/:id/:commentId', postController.likeComments);

module.exports = router;