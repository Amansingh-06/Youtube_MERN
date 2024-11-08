const express = require('express');
const { uploadVideo, getAllvideo, getVideoById, getAllvideoByUserId } = require('../controller/Video');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/uploadVideo', authMiddleware, uploadVideo);
router.get('/video', getAllvideo);
router.get('/video/:id', getVideoById)
router.get('/profile/:userId',getAllvideoByUserId)

module.exports = router