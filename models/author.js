const mongoose = require('mongoose')
const Movie = require('./movie')
const Serie = require('./serie')

const authorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
    
})

authorSchema.pre('remove', function(next){
    Serie.find({ author : this.id}, (err, series) => {
        if (err){
            next(err)
        }else if (series.length > 0 ){
            next(new Error('This author has series still'))
        }else {
            next()
        }

    })
    Movie.find({ author : this.id}, (err, movies) => {
        if (err){
            next(err)
        }else if (movies.length > 0 ){
            next(new Error('This author has movies still'))
        }else {
            next()
        }

    })

})
module.exports = mongoose.model('Author', authorSchema)