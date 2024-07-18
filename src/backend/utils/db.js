const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connection Establish")

    } catch (error) {
        console.log("database connection failed")
        process.exit(0)

    }
}

module.exports = connectDatabase;