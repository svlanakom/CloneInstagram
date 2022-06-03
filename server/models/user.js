const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    sex: String,
    country: String,
    birthdate: Date,
    hobby: Array

    
})
module.exports = mongoose.model('User', userSchema);
