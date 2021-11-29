const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs') 
const Serie = require('../models/serie')
const uploadPath = path.join('public', Serie.coverImageBasePath)
const Author = require('../models/author')
const imageMimeTypes = ['image/jpeg', 'image/gif', 'image/png']
const upload = multer({
    dest: uploadPath, 
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})

// All series route
router.get('/', async (req,res)=>{
    let query = Serie.find()
    if (req.query.title != null && req.query.title != ''){
        query = query.regex('title', new RegExp(req.query.title, 'i'))
    } 
    if (req.query.releasedBefore != null && req.query.releasedBefore != ''){
        query = query.lte('releaseDate', req.query.releasedBefore)
    }
    if (req.query.releasedAfter != null && req.query.releasedAfter != ''){
        query = query.gte('releaseDate', req.query.releasedAfter)
    }
    
    try {
        const series = await query.exec()
        res.render('series/index',{
            series : series ,
            searchOptions : req.query
        })
    } catch {
        res.redirect('/')
    }
    
})

// New Serie Route
router.get('/new', async (req,res)=>{
    renderNewPage(res, new Serie())
})

// Create Serie Route 
router.post('/', upload.single('cover') , async (req,res)=>{
    const fileName = req.file != null ? req.file.filename : null
    const serie = new Serie({
        title : req.body.title,
        author : req.body.author,
        releaseDate : new Date(req.body.releaseDate),
        runtime : req.body.runtime,
        coverImageName: fileName,
        description : req.body.description
    })
    try {
        const newSerie = await serie.save()
        res.redirect(`series`)
    } catch {
        if (serie.coverImageName != null){
            removeSerieCover(serie.coverImageName)
        }
        renderNewPage(res, serie, true)
    }
})

function removeSerieCover(fileName){
    fs.unlink(path.join(uploadPath, fileName), err => {
        if (err) console.error(err)
    } )
}

async function renderNewPage(res, serie, hasError = false) {
    try { 
        const authors = await Author.find({})
        const params = {
            authors : authors, 
            serie : serie
        }
        if (hasError) params.errorMessage = 'Error Creating Serie'
        res.render('series/new', params)
    } catch { 
        res.redirect('/series')
    }
}

module.exports = router