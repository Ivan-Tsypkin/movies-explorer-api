const { celebrate, Joi } = require('celebrate');
const { RegExpForUrl } = require('../utils/constants');

const validateMoviePost = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(1).max(100),
    director: Joi.string().required().min(1).max(100),
    duration: Joi.number().integer().required().min(1)
      .max(1000),
    year: Joi.string().required().min(1).max(30),
    description: Joi.string().required().min(1).max(2000),
    image: Joi.string().required(),
    trailerLink: Joi.string().required(),
    nameRU: Joi.string().required().min(1).max(100),
    nameEN: Joi.string().required().min(1).max(100),
    thumbnail: Joi.string().required().pattern(RegExpForUrl),
    movieId: Joi.number().integer().required(),
  }),
});

const validateMovieDelete = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
});

const validateUserPatch = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

module.exports = {
  validateMoviePost,
  validateMovieDelete,
  validateUserPatch,
  validateSignup,
  validateSignin,
};
