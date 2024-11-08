const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String

    },
    thumbnail: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: "All"
    },
    videolink: {
        type: String,
        required: true
    },
    like: {
        type: Number,
        default: 0
    },
    dislike: {
        type: Number,
        default: 0

    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel', // Reference to the Channel schema
        required: true,
    },
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        
    }
}, { timestamps: true })

module.exports=mongoose.model('Video',videoSchema)