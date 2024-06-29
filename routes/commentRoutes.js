const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.get('/', commentController.getAllComments);
router.post('/', commentController.createComment);
router.get('/post/:postId', commentController.getCommentsForPost);

module.exports = router;
