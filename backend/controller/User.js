const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

//------User Registration---//

exports.SignUp = async (req, res) => {
    try {
        const { userName, email, password, profilepic } = req.body;
        const isExist = await User.findOne({ email });
        ///----checking if user is exist or not ---//
        if (isExist) {
            return res.status(400).json({
                success: false,
                msg: "User already Exist"
            })
        }
        //-----hashing the password---///
        const hashpassword = await bcrypt.hash(password, 10);
        const user = new User({
            userName,
            email,
            password: hashpassword,
            profilepic,

        })
        await user.save();

        res.status(201).json({
            success: true,
            data: user,
            msg: "Account created successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }

}

//--- USER SIGNIN ---//



// Login function to set token in cookies


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, msg: "Invalid credentials" });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, msg: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send response with user details and token (excluding password)
        res.json({
            success: true,
            msg: "Logged in successfully",
            user: {
                userName: user.userName,
                email: user.email,
                profilepic: user.profilepic,
                userId: user._id
            },
            token
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


//---logout---///


exports.logout = (req, res) => {
    try {
        res.json({success:true,message:"Logged out successfully"})
    } catch (error) {

        res.status(500).json({ success: false, error: error.message });
    }    
    

}
