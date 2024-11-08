const jwt = require('jsonwebtoken');
const User = require('../Models/User');
require('dotenv').config();


const authMiddleware = async (req, res, next) => {
    
    const token = req.headers.authorization?.split(' ')[1]; // Get token from the Authorization header
    console.log(token)
    
    if (!token) {
        return res.status(401).json({ success: false, msg: "No token provided. Please log in first." });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ success: false, msg: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;
