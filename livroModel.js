const mongoose = require ('mongoose')

const LivroSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    autor: {
        type: String,
        require: true 
    },
    categoria:{
        type: String,
        require: true
    }
})

modules.exports = mongoose.model('biblioteca', LivroSchema)
