const { Router } = require('express')
const MovieController = require('./controllers/MovieController')


const router = Router()

// Movies
router.post('/movie', MovieController.createMovie)
router.get('/movie', MovieController.listMovies)
router.put('/movie/:id', MovieController.updateMovie)
router.delete('/movie/:id', MovieController.deleteMovie)

module.exports = router