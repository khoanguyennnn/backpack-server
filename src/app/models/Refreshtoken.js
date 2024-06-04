const mongoose = require('mongoose');

const RefreshToken = new mongoose.Schema({
    token: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

module.exports = mongoose.model('Refreshtoken', RefreshToken);
