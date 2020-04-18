const mongoose = require('mongoose');

const socketSchema = new mongoose.Schema({
    socket : Number,
    id_user:String,
    sala:String
});

module.exports = mongoose.model('socket', socketSchema);