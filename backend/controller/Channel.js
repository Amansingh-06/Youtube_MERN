const Channel = require('../Models/Channel'); // Import the Channel model

//------ Add Channel Function ------//
exports.addChannel = async (req, res) => {
    try {
        const { channelName, userName, profilePic } = req.body;
        const user = req.user;  // User info is attached to req.user by the authMiddleware

        console.log(user);

        // Check if channel name already exists
        const existingChannel = await Channel.findOne({ channelName });
        if (existingChannel) {
            return res.status(400).json({
                success: false,
                msg: "Channel already exists",
            });
        }

        // Create new channel
        const newChannel = new Channel({
            user:user._id,  // Reference to the user who owns the channel
            channelName,
            userName,
            profilePic,
            createdBy: user,  // Set the user who created the channel
        });

        await newChannel.save();  // Save the new channel to the database

        // Send a successful response
        res.status(201).json({
            success: true,
            channel: newChannel,
            msg: "Channel created successfully",
        });
    } catch (error) {
        // Send error response
        res.status(500).json({
            success: false,
            msg: error.message,  // Send the error message
        });
    }
};



exports.getChannelByUserId = async (req, res) => {
    try {
         const {userId} = req.params // Get the userId from the route params

        // Find the channel by the userId
        const channel = await Channel.findOne({ user: userId })
            

        // Check if the channel is found
        if (!channel) {
            return res.status(404).json({
                success: false,
                msg: 'Channel not found for this user'
            });
        }

        console.log("Fetched Channel by UserId:", channel);  // Log the channel with populated user and channel details

        return res.status(200).json({
            success: true,
            channel: channel
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        });
    }
};


 // Import your Channel model

// API endpoint to check if the user has a channel
exports.checkIfUserHasChannel = async (req, res) => {
    try {
        const userId = req.user._id; // Get the logged-in user's ID from the request object

        // Find the user's channel by userId
        const channel = await Channel.findOne({ user: userId });

        if (channel) {
            return res.status(200).json({
                success: true,
                message: "User has a channel",
                channel: channel
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "User does not have a channel"
            });
        }
    } catch (error) {
        console.error("Error checking if user has a channel:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};



