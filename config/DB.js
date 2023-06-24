const mongoose = require('mongoose')
const colors = require('colors');

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${connect.connection.host}`.green.bold)
    } catch (error) {
        console.log(`Error: Not able to connect to the database [${error.message}]`.red.bold);
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB