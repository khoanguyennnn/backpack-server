const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
})

module.exports = mongoose.model('User', User);
