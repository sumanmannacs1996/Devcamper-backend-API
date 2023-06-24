const express = require("express");
const dotenv = require('dotenv');
const colors = require('colors');
dotenv.config({ path: "./config/config.env" })

const bootcampsRoute = require('./routes/bootcamps')
const connectDB = require('./config/DB')

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000

// Body parser and post json middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Loger middleware
app.use(require('./middlewares/logger'));

// Bootcamp routes
app.use('/api/v1/bootcamps', bootcampsRoute)

// Error middleware
app.use(require('./middlewares/error'))

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold));


// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    // server.close(() => process.exit(1));
});

