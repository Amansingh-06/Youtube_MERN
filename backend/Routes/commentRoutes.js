const express = require('express');

const authMiddleware = require('../middleware/auth');
const { addComment, getcommentbyVId } = require('../controller/Comment');
const router = express.Router();

router.post('/addcomment/:id',authMiddleware, addComment)
router.get('/comment/:videoId',getcommentbyVId)

module.exports = router