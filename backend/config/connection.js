const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const connectDb = () => {
    mongoose.connect(process.env.URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log("Database Connected Successfully");
        })
        .catch(err => {
            console.error("Database connection failed:", err);

        });
};

module.exports = connectDb;
