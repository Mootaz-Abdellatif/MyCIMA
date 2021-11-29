const mongoose = require('mongoose')


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
    coverImage:{
        type: Buffer,
        required: true
    }, 
    coverImageType:{
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
    if (this.coverImage != null && this.coverImageType != null){
        return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`

    }
})

module.exports = mongoose.model('Serie', serieSchema)
