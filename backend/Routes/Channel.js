const express = require('express');
const { addChannel, getChannelByUserId, checkIfUserHasChannel } = require('../controller/Channel');
const authMiddleware = require('../middleware/auth');


const router = express.Router();

router.post('/channel',authMiddleware, addChannel);
router.get('/channel/:userId', getChannelByUserId)
router.get('/userChannel',authMiddleware,checkIfUserHasChannel)


module.exports = router