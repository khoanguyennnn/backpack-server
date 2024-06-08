const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://nminhkhoa60:agt0Og9Qu7Vvy4xQ@backpack-database.3uan25v.mongodb.net/backpack-database');
        console.log('connect successfully!');
    } catch (error) {
        console.log('connect failed!');
    }
}

module.exports = { connect };
