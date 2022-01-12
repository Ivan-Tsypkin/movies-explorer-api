const router = require('express').Router();
const {
  createMovie, getAllMovies, deleteMovieById,
} = require('../controllers/movies');
const {
  validateMoviePost, validateMovieDelete,
} = require('../middlewares/validations');

router.get('/', getAllMovies);
router.post('/', validateMoviePost, createMovie);
router.delete('/:movieId', validateMovieDelete, deleteMovieById);

module.exports = router;
