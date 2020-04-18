const mongoose = require('mongoose');
const {Schema} =  mongoose; //= const Schema = mongoose.Schema();
const Jugador = require('./jugador'); 

const SalaSchema =new Schema({
    codigo:{type: String},
    cantJugadores:{type:Number},
    puntoGanador:{type:Number},
    estado:{type:Number},
    estadoDesc:{type: String},
    
});

module.exports = mongoose.model('sala', SalaSchema);