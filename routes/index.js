const express = require('express')
const router = express.Router()
const Serie = require('../models/serie')
const Movie = require('../models/movie')

router.get('/', async (req,res)=>{
    let series 
    let movies
    try{
        series = await Serie.find().sort({ createdAt : 'desc'}).limit(10).exec()
        movies = await Movie.find().sort({ createdAt : 'desc'}).limit(10).exec()
    } catch{
        series = []
        movies = []
 
    }
    res.render('index' , {series : series , movies: movies})
})

module.exports = router