const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
    
})

module.exports = mongoose.model('Movie', movieSchema)