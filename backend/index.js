const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors')
const connection = require('./config/connection')
const userRoutes = require('./Routes/UserRoutes')
const ChannelRoutes = require('./Routes/Channel')
const VideoRoutes = require('./Routes/Video')
const commentRoutes = require('./Routes/commentRoutes')

const app = express();
connection();//connect to database
app.use(express.json());//middleware
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true // Allow credentials (cookies)
}));

app.use('/user', userRoutes)
app.use('/create/', ChannelRoutes)
app.use('/api', VideoRoutes)
app.use('/video',commentRoutes)

const PORT = process.env.PORT || 8201; // Default to port 8201 if not specified
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


