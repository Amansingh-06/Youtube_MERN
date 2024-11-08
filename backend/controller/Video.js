const Video = require('../Models/Video'); // Video Schema
const Channel = require("../Models/Channel")

// ------UPLOAD VIDEO------

exports.uploadVideo = async (req, res) => {
    try {
        console.log("aman")
        const userId = req.user._id; // Assuming user ID is available from the logged-in session
        const { title, description, thumbnail, category, videolink } = req.body;

        // Find the user's channel
        const channel = await Channel.findOne({ user: userId });

        if (!channel) {
            return res.status(400).json({ success: false, message: "User has not created a channel yet." });
        }

        // Create a new video with the channel linked
        const newVideo = await Video.create({
            user: userId,
            title,
            description,
            thumbnail,
            category,
            videolink,
            channel: channel._id// Link the channel ID here
        });

        console.log("Uploaded Video:", newVideo); // Log the created video to verify channel is saved

        res.status(201).json({
            success: true,
            message: "Video uploaded successfully",
            video: newVideo
        });
    } catch (error) {
        console.error("Error uploading video:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


//------GET ALL VIDEOS------//

exports.getAllvideo = async (req, res) => {
    try {
        const videos = await Video.find()
            .populate('user', 'profilepic userName createdAt')  // Populate the user field
            .populate('channel', 'channelName profilePic createdAt');       // Populate the channel field

        console.log("Fetched Videos:", videos); // Log fetched videos to ensure channel data is populated

        res.status(200).json({
            success: true,
            videos: videos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
};


// ----GET VIDEO BY ID---- //

exports.getVideoById = async (req, res) => {
    try {
        let { id } = req.params;
        const video = await Video.findById(id)
            .populate('user', 'profilepic userName ')  // Populate the user details
            .populate('channel', 'channelName profilePic createdAt'); // Populate the channel details


        if (!video) {
            return res.status(404).json({
                success: false,
                msg: 'Video not found'
            });
        }

        console.log("Fetched Video by ID:", video); // Log the single video to verify data

        res.status(200).json({
            success: true,
            video: video
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
};


// ----GET ALL VIDEOS BY USER ID---- //

exports.getAllvideoByUserId = async (req, res) => {
    try {
        let { userId } = req.params;
        const videos = await Video.find({ user: userId })
            .populate('user', 'profilepic userName email createdAt')
            .populate('channel', 'channelName about createdAt'); // Populate channel details

        console.log("Fetched Videos by User ID:", videos); // Log to confirm channel data

        res.status(200).json({
            success: true,
            videos: videos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
};
