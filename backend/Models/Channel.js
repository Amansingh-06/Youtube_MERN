const mongoose = require('mongoose');



const ChannelSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // This represents the user who created the channel
        required: true,
        unique:true
    },
    channelName: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required:true
    }
}, { timestamps: true });

module.exports = mongoose.model('Channel', ChannelSchema);
