/* eslint-disable no-console */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const CustomError = require('../errors/CustomError');
const { JWT_SECRET } = require('../utils/constants');

const userNotFoundError = new CustomError(404, 'Пользователь не найден', 'UserNotFoundError');
const mongoServerError = new CustomError(409, 'Пользователь уже зарегистрирован!', 'MongoServerError');

module.exports.createUser = (req, res, next) => bcrypt.hash(req.body.password, 10)
  .then((hash) => User.create({
    email: req.body.email,
    name: req.body.name,
    password: hash,
  }))
  .then((user) => res.send({
    name: user.name, email: user.email,
  }))
  .catch((err) => {
    if (err.code === 11000) {
      return next(mongoServerError);
    }
    return next(err);
  });

module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        })
        .send({ message: 'Вход выполнен!' });
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const id = req.user._id;

  User.findById(id)
    .orFail(() => { throw userNotFoundError; }) // Если пользователь не найден, генерируем ошибку
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => { throw userNotFoundError; }) // Если пользователь не найден, генерируем ошибку
    .then((user) => res.send(user))
    .catch(next);
};
