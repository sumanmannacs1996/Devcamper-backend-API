const fs = require('fs');

const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv')

//Load env vars
dotenv.config({ path: './config/config.env' });

// Load models 
const Bootcamp = require('./models/Bootcamp')

// Connect to DB
mongoose.connect(process.env.MONGO_URI)

// Read Json files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));

// Import to DB
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps)
        console.log("Data imported successfully".green.inverse);
        process.exit()
    } catch (error) {
        console.log(error);
    }
}

// Delete Data
const delteData = async () => {
    try {
        await Bootcamp.deleteMany();
        console.log("Data destroyed successfully".red.inverse);
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

if (process.argv[2] === "-i") {
    importData()
} else if (process.argv[2] === "-d") {
    delteData()
}