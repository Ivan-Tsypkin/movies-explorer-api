/* eslint-disable no-console */
const Movie = require('../models/movie');
const CustomError = require('../errors/CustomError');

const cardNotFoundError = new CustomError(404, 'Фильм не найден!', 'MovieNotFoundError');
const deleteError = new CustomError(403, 'Удалять можно только свои фильмы!', 'DeleteError');

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const { user } = req;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: user,
  })
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.getAllMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => { throw cardNotFoundError; })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw deleteError;
      }

      return Movie.findByIdAndRemove(req.params.movieId);
    })
    .then((movie) => res.send({ message: `Фильм ${movie.nameRU} - удален!` }))
    .catch(next);
};
