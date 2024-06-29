const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.getAllPosts);
router.post('/', postController.createPost);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.get('/catAuthors', postController.getAllPostsWithAuthorsAndCategories);
router.get('/:id/comments', postController.getCommentsForPost);
router.get('/tags', postController.getAllPostsWithTags);
router.get('/search', postController.searchPostsByKeyword);
router.get('/userCount', postController.countPostsByUser);

module.exports = router;
