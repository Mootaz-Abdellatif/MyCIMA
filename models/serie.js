const mongoose = require('mongoose')

const coverImageBasePath = 'uploads/serieCovers'
const path = require('path')

const serieSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String
    }, 
    releaseDate:{
        type: Date,
        required: true

    }, 
    runtime : {
        type: Number,
        required: true
    },
    createdAt :{
        type: Date,
        required: true,
        default: Date.now
    },
    coverImageName:{
        type: String,
        required: true
    }, 
    author:{
        type: mongoose.Schema.Types.ObjectId, 
        required : true,
        ref: 'Author'
    } 

    
})

serieSchema.virtual('coverImagePath').get(function(){
    if (this.coverImageName != null){
        return path.join('/', coverImageBasePath, this.coverImageName)

    }
})

module.exports = mongoose.model('Serie', serieSchema)
module.exports.coverImageBasePath = coverImageBasePath