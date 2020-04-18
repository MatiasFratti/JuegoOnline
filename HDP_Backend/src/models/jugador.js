const mongoose = require('mongoose');
const {Schema} =  mongoose; //= const Schema = mongoose.Schema();

const JugadorSchema = new Schema({
    
    codigo: {type: String},
    nombre:{type: String, required: true},
    genero:{type: String}
    
});

module.exports = mongoose.model('jugador', JugadorSchema);