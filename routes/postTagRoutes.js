const express = require('express');
const router = express.Router();
const postTagController = require('../controllers/postTagController');

router.get('/', postTagController.getAllPostTags);
router.post('/', postTagController.createPostTag);

module.exports = router;
