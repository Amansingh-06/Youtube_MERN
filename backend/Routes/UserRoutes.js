const express = require('express');
const { SignUp, login,logout } = require('../controller/User');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/signup', SignUp);
router.post('/login',login, );
router.post('/logout', logout);

module.exports=router