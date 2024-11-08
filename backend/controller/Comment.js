const Comment = require('../Models/comment');
const User = require('../Models/User')

// Add a Comment to a Video

const Video = require('../Models/Video'); // Assuming you have this model




exports.addComment = async (req, res) => {
    try {
        const { id } = req.params; // Video ID
        const { message } = req.body; // Ensure `message` is defined in the request body
        const user = req.user; // Authenticated user (assuming middleware sets `req.user`)

        // Check if the video exists
        const video = await Video.findById(id);
        if (!video) {
            return res.status(404).json({
                success: false,
                msg: 'Video not found'
            });
        }


        // Create the comment
        const newComment = new Comment({
            message, // Use the message from req.body
            video: id,
            user: user._id
        });

        await newComment.save();

        res.status(201).json({
            success: true,
            msg: 'Comment added successfully',
            comment: newComment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
};


// Get Comments by Video ID
exports.getcommentbyVId = async (req, res) => {
    try {
        const { videoId } = req.params;
        console.log(videoId)

        // Find comments associated with the specified video
        const comments = await Comment.find({ video: videoId })
            .populate('user'); // Populate specific user fields

        res.status(200).json({
            success: true,
            comments: comments
        });
    } catch (error) {
        console.error("Error in getcommentbyVId:", error); // Log error for debugging
        res.status(500).json({
            success: false,
            error: "Server Error"
        });
    }
};

