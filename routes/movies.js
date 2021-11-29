const express = require('express')
const router = express.Router()
const Movie = require('../models/movie')
const Author = require('../models/author')
const path = require('path')
const imageMimeTypes = ['image/jpeg', 'image/gif', 'image/png']
// const upload = multer({
//     dest: uploadPath, 
//     fileFilter: (req, file, callback) => {
//         callback(null, imageMimeTypes.includes(file.mimetype))
//     }
// })

// All movies
router.get('/', async (req,res)=>{
    let searchOptions = {}
    if (req.query.title != null && req.query.title !== '') {
        searchOptions.title = new RegExp(req.query.title , 'i')
    }
    try{
        
        const movies = await Movie.find(searchOptions)
        res.render('movies/index' , { 
            movies: movies, 
            searchOptions: req.query 
        })


    } catch{

        res.redirect('/')

    }
})

// new movie route
router.get('/new', (req,res)=>{
    //res.render('movies/new', { movie: new Movie() })
    renderNewPage(res, new Movie())
})

// create movies 
router.post('/', async (req,res)=>{
    const movie = new Movie({
        title: req.body.title,
        gender: req.body.gender,
        releaseDate : new Date(req.body.releaseDate),
        runtime : req.body.runtime,
        description : req.body.description,
        author : req.body.author, 


    })
    saveCover(movie, req.body.cover)

    try{
        const newMovie = await movie.save()
        //res.redirect(`movies/${newMovie.id}`)
        res.redirect('movies')

    }
    catch{

        // res.render('movies/new', {
        // movie: movie,
        // errorMessage: 'Error creating Movie'
        // })
        renderNewPage(res , movie, true)
    }
    
})

async function renderNewPage(res, movie, hasError = false) {
    try { 
        const authors = await Author.find({})
        const params = {
            authors : authors, 
            movie : movie
        }
        if (hasError) params.errorMessage = 'Error Creating Movie'
        res.render('movies/new', params)
    } catch { 
        res.redirect('/movies')
    }
}
function saveCover(movie, coverEncoded){
    if (coverEncoded == null ) return 
    const cover = JSON.parse(coverEncoded)
    if (coverEncoded != null && imageMimeTypes.includes(cover.type)){
        serie.coverImage =  new Buffer.from(cover.data, 'base64')
        serie.coverImageType = cover.type
    }
}
module.exports = router