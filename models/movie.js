const mongoose = require('mongoose')

const coverImageBasePath = 'uploads/movieCovers'
const path = require('path')

const movieSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    gender :{
        type: String,
        required: true
    }, 
    runtime :{
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    releaseDate:{
        type: Date,
        required: true

    },
    author:{
        type: mongoose.Schema.Types.ObjectId, 
        required : true,
        ref: 'Author'
    }, 
    createdAt :{
        type: Date,
        required: true,
        default: Date.now
    },
    coverImageName:{
        type: String,
        required: true
    }
    
})

movieSchema.virtual('coverImagePath').get(function(){
    if (this.coverImageName != null){
        return path.join('/', coverImageBasePath, this.coverImageName)

    }
})

module.exports = mongoose.model('Movie', movieSchema)
module.exports.coverImageBasePath = coverImageBasePath